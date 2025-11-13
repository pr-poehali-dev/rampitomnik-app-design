"""
Business: Manage plants catalog (get all, create, update, delete)
Args: event - dict with httpMethod, body, queryStringParameters
      context - object with attributes: request_id, function_name
Returns: HTTP response dict with plants data
"""

import json
import os
from typing import Dict, Any
import psycopg2
from psycopg2.extras import RealDictCursor

def get_db_connection():
    database_url = os.environ.get('DATABASE_URL')
    return psycopg2.connect(database_url, cursor_factory=RealDictCursor)

def handler(event: Dict[str, Any], context: Any) -> Dict[str, Any]:
    method: str = event.get('httpMethod', 'GET')
    
    if method == 'OPTIONS':
        return {
            'statusCode': 200,
            'headers': {
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Headers': 'Content-Type, X-User-Id, X-Auth-Token',
                'Access-Control-Max-Age': '86400'
            },
            'body': '',
            'isBase64Encoded': False
        }
    
    conn = get_db_connection()
    cur = conn.cursor()
    
    try:
        if method == 'GET':
            cur.execute("SELECT * FROM plants ORDER BY id")
            plants = cur.fetchall()
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps([dict(plant) for plant in plants], default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'POST':
            body_data = json.loads(event.get('body', '{}'))
            
            name = body_data.get('name')
            category = body_data.get('category')
            price = body_data.get('price')
            image_url = body_data.get('image_url', '')
            description = body_data.get('description', '')
            in_stock = body_data.get('in_stock', True)
            
            if not name or not category or not price:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing required fields'}),
                    'isBase64Encoded': False
                }
            
            cur.execute(
                "INSERT INTO plants (name, category, price, image_url, description, in_stock) VALUES (%s, %s, %s, %s, %s, %s) RETURNING *",
                (name, category, price, image_url, description, in_stock)
            )
            plant = cur.fetchone()
            conn.commit()
            
            return {
                'statusCode': 201,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(plant), default=str),
                'isBase64Encoded': False
            }
        
        elif method == 'PUT':
            body_data = json.loads(event.get('body', '{}'))
            plant_id = body_data.get('id')
            
            if not plant_id:
                return {
                    'statusCode': 400,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Missing plant ID'}),
                    'isBase64Encoded': False
                }
            
            updates = []
            params = []
            
            if 'name' in body_data:
                updates.append('name = %s')
                params.append(body_data['name'])
            if 'category' in body_data:
                updates.append('category = %s')
                params.append(body_data['category'])
            if 'price' in body_data:
                updates.append('price = %s')
                params.append(body_data['price'])
            if 'image_url' in body_data:
                updates.append('image_url = %s')
                params.append(body_data['image_url'])
            if 'description' in body_data:
                updates.append('description = %s')
                params.append(body_data['description'])
            if 'in_stock' in body_data:
                updates.append('in_stock = %s')
                params.append(body_data['in_stock'])
            
            updates.append('updated_at = CURRENT_TIMESTAMP')
            params.append(plant_id)
            
            query = f"UPDATE plants SET {', '.join(updates)} WHERE id = %s RETURNING *"
            cur.execute(query, params)
            plant = cur.fetchone()
            conn.commit()
            
            if not plant:
                return {
                    'statusCode': 404,
                    'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                    'body': json.dumps({'error': 'Plant not found'}),
                    'isBase64Encoded': False
                }
            
            return {
                'statusCode': 200,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps(dict(plant), default=str),
                'isBase64Encoded': False
            }
        
        else:
            return {
                'statusCode': 405,
                'headers': {'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*'},
                'body': json.dumps({'error': 'Method not allowed'}),
                'isBase64Encoded': False
            }
    
    finally:
        cur.close()
        conn.close()
