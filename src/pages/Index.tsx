import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Separator } from "@/components/ui/separator";
import Icon from "@/components/ui/icon";

type Plant = {
  id: number;
  name: string;
  category: string;
  price: number;
  image: string;
  description: string;
  inStock: boolean;
};

type CartItem = Plant & { quantity: number };

const plants: Plant[] = [
  {
    id: 1,
    name: "Сосна обыкновенная",
    category: "Хвойные",
    price: 1200,
    image: "https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/3323152c-490d-403e-bb3d-2e6977b74d71.jpg",
    description: "Высота 40-60 см, контейнер 3л",
    inStock: true,
  },
  {
    id: 2,
    name: "Ель колючая (голубая)",
    category: "Хвойные",
    price: 2500,
    image: "https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/3323152c-490d-403e-bb3d-2e6977b74d71.jpg",
    description: "Высота 60-80 см, контейнер 5л",
    inStock: true,
  },
  {
    id: 3,
    name: "Туя западная 'Смарагд'",
    category: "Хвойные",
    price: 1800,
    image: "https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/3323152c-490d-403e-bb3d-2e6977b74d71.jpg",
    description: "Высота 50-70 см, контейнер 4л",
    inStock: true,
  },
  {
    id: 4,
    name: "Спирея японская",
    category: "Кустарники",
    price: 800,
    image: "https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/72999392-ef59-4ed4-ae21-871b351ac944.jpg",
    description: "Высота 30-40 см, контейнер 2л",
    inStock: true,
  },
  {
    id: 5,
    name: "Гортензия метельчатая",
    category: "Кустарники",
    price: 1500,
    image: "https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/72999392-ef59-4ed4-ae21-871b351ac944.jpg",
    description: "Высота 40-50 см, контейнер 3л",
    inStock: true,
  },
  {
    id: 6,
    name: "Барбарис Тунберга",
    category: "Кустарники",
    price: 900,
    image: "https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/72999392-ef59-4ed4-ae21-871b351ac944.jpg",
    description: "Высота 30-40 см, контейнер 2л",
    inStock: true,
  },
  {
    id: 7,
    name: "Хоста 'Sum and Substance'",
    category: "Многолетники",
    price: 600,
    image: "https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/8aa576e0-951e-4cb5-ace8-d6506e14ce71.jpg",
    description: "Контейнер 1.5л",
    inStock: true,
  },
  {
    id: 8,
    name: "Лилейник гибридный",
    category: "Многолетники",
    price: 500,
    image: "https://cdn.poehali.dev/projects/4315a037-1f24-48b2-973a-0ab6393585b8/files/8aa576e0-951e-4cb5-ace8-d6506e14ce71.jpg",
    description: "Контейнер 1.5л",
    inStock: true,
  },
];

const Index = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [activeSection, setActiveSection] = useState<string>("catalog");
  const [user, setUser] = useState<any>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = localStorage.getItem("user");
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  const addToCart = (plant: Plant) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === plant.id);
      if (existing) {
        return prev.map((item) =>
          item.id === plant.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...plant, quantity: 1 }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQuantity = (id: number, change: number) => {
    setCart((prev) =>
      prev
        .map((item) =>
          item.id === id ? { ...item, quantity: Math.max(0, item.quantity + change) } : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Trees" className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-primary">РамПитомник</span>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <button
              onClick={() => setActiveSection("catalog")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "catalog" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Каталог
            </button>
            <button
              onClick={() => setActiveSection("about")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "about" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              О питомнике
            </button>
            <button
              onClick={() => setActiveSection("delivery")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "delivery" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Доставка и оплата
            </button>
            <button
              onClick={() => setActiveSection("contacts")}
              className={`text-sm font-medium transition-colors hover:text-primary ${
                activeSection === "contacts" ? "text-primary" : "text-muted-foreground"
              }`}
            >
              Контакты
            </button>
          </nav>

          <div className="flex items-center gap-3">
            {user ? (
              <>
                <span className="text-sm text-muted-foreground hidden md:block">
                  {user.full_name}
                </span>
                {user.is_admin && (
                  <Button variant="outline" size="sm" onClick={() => navigate("/admin")}>
                    <Icon name="Settings" className="h-4 w-4 mr-2" />
                    Админ
                  </Button>
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    localStorage.removeItem("user");
                    localStorage.removeItem("token");
                    setUser(null);
                  }}
                >
                  <Icon name="LogOut" className="h-4 w-4" />
                </Button>
              </>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                <Icon name="User" className="h-4 w-4 mr-2" />
                Вход
              </Button>
            )}
            <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="relative">
                <Icon name="ShoppingCart" className="h-5 w-5" />
                {totalItems > 0 && (
                  <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                    {totalItems}
                  </Badge>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent className="w-full sm:max-w-lg">
              <SheetHeader>
                <SheetTitle>Корзина</SheetTitle>
                <SheetDescription>
                  {totalItems > 0 ? `Товаров в корзине: ${totalItems}` : "Ваша корзина пуста"}
                </SheetDescription>
              </SheetHeader>
              <div className="mt-8 space-y-4">
                {cart.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="h-20 w-20 rounded-md object-cover"
                    />
                    <div className="flex-1">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-muted-foreground">{item.price} ₽</p>
                      <div className="flex items-center gap-2 mt-2">
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, -1)}
                        >
                          <Icon name="Minus" className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{item.quantity}</span>
                        <Button
                          size="icon"
                          variant="outline"
                          className="h-7 w-7"
                          onClick={() => updateQuantity(item.id, 1)}
                        >
                          <Icon name="Plus" className="h-3 w-3" />
                        </Button>
                        <Button
                          size="icon"
                          variant="ghost"
                          className="h-7 w-7 ml-auto"
                          onClick={() => removeFromCart(item.id)}
                        >
                          <Icon name="Trash2" className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {cart.length > 0 && (
                <>
                  <Separator className="my-4" />
                  <div className="space-y-4">
                    <div className="flex justify-between text-lg font-semibold">
                      <span>Итого:</span>
                      <span>{totalPrice} ₽</span>
                    </div>
                    <Button className="w-full" size="lg">
                      Оформить заказ
                    </Button>
                  </div>
                </>
              )}
            </SheetContent>
          </Sheet>
          </div>
        </div>
      </header>

      <main className="container py-8">
        {activeSection === "catalog" && (
          <div className="space-y-8">
            <section className="text-center space-y-4">
              <h1 className="text-4xl font-bold tracking-tight">
                Питомник растений РамПитомник
              </h1>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Качественные саженцы хвойных, лиственных деревьев, кустарников и многолетников
              </p>
            </section>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {plants.map((plant) => (
                <Card key={plant.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <CardHeader className="p-0">
                    <img
                      src={plant.image}
                      alt={plant.name}
                      className="w-full h-48 object-cover"
                    />
                  </CardHeader>
                  <CardContent className="p-4">
                    <Badge variant="secondary" className="mb-2">
                      {plant.category}
                    </Badge>
                    <CardTitle className="text-lg mb-1">{plant.name}</CardTitle>
                    <CardDescription className="text-sm">{plant.description}</CardDescription>
                    <p className="text-2xl font-bold text-primary mt-3">{plant.price} ₽</p>
                  </CardContent>
                  <CardFooter className="p-4 pt-0">
                    <Button
                      className="w-full"
                      onClick={() => addToCart(plant)}
                      disabled={!plant.inStock}
                    >
                      <Icon name="ShoppingCart" className="h-4 w-4 mr-2" />
                      {plant.inStock ? "В корзину" : "Нет в наличии"}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}

        {activeSection === "about" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold">О питомнике</h1>
            <p className="text-lg text-muted-foreground">
              Питомник растений РамПитомник работает с 2010 года. Мы выращиваем качественные
              саженцы хвойных и лиственных деревьев, декоративных кустарников и многолетних
              цветов.
            </p>
            <div className="grid md:grid-cols-3 gap-4">
              <Card>
                <CardHeader>
                  <Icon name="Award" className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Качество</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Все растения выращены в нашем питомнике с соблюдением агротехники
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="Truck" className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Доставка</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Бережная доставка по Москве и области
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <Icon name="HeartHandshake" className="h-8 w-8 text-primary mb-2" />
                  <CardTitle>Гарантия</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Гарантия приживаемости растений
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeSection === "delivery" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold">Доставка и оплата</h1>
            <Card>
              <CardHeader>
                <CardTitle>Условия доставки</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-2">По Москве в пределах МКАД</h3>
                  <p className="text-muted-foreground">Стоимость доставки — 500 ₽</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">За МКАД</h3>
                  <p className="text-muted-foreground">500 ₽ + 30 ₽/км от МКАД</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Самовывоз</h3>
                  <p className="text-muted-foreground">Бесплатно при заказе от 3000 ₽</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Способы оплаты</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• Наличными при получении</li>
                  <li>• Картой при получении</li>
                  <li>• Онлайн-оплата на сайте</li>
                  <li>• Безналичный расчет для юридических лиц</li>
                </ul>
              </CardContent>
            </Card>
          </div>
        )}

        {activeSection === "contacts" && (
          <div className="max-w-3xl mx-auto space-y-6">
            <h1 className="text-4xl font-bold">Контакты</h1>
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div className="flex items-start gap-3">
                  <Icon name="MapPin" className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Адрес питомника</p>
                    <p className="text-muted-foreground">
                      Московская область, Раменский район
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Phone" className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Телефон</p>
                    <p className="text-muted-foreground">+7 (495) 123-45-67</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Mail" className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Email</p>
                    <p className="text-muted-foreground">info@rampitomnik.ru</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Icon name="Clock" className="h-5 w-5 text-primary mt-1" />
                  <div>
                    <p className="font-semibold">Режим работы</p>
                    <p className="text-muted-foreground">Ежедневно с 9:00 до 18:00</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </main>

      <footer className="border-t mt-16">
        <div className="container py-8 text-center text-muted-foreground">
          <p>© 2024 РамПитомник. Все права защищены.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;