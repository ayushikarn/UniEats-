
// API Service for UniEats Frontend
// Connects to the UniEats V2 backend at http://localhost:5000

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

// Backend API Response Types
export interface BackendMenuItem {
  food_items: string;
  shop_name: string;
  price: number;
  food_court: string;
  flavour: string;
  spice_level: string;
}

export interface MenuApiResponse {
  success: boolean;
  count: number;
  items: BackendMenuItem[];
}

// Chat API Response
export interface ChatApiResponse {
  success: boolean;
  conversationId: string;
  reply: string;
  recommendations: BackendMenuItem[];
  count: number;
  totalCost?: number;
  message?: string;
}

// Frontend MenuItem Type
export interface MenuItem {
  id: string;
  name: string;
  price: number;
  outlet: string;
  category: string;
  foodCourt: string;
  flavour: string;
  spiceLevel: string;
  veg: boolean;
  available: boolean;
  image: string;
  popular: boolean;
  reason: string;
}

// Transform backend item to frontend MenuItem
function transformMenuItem(
  item: BackendMenuItem,
  index: number
): MenuItem {
  const name = item.food_items.toLowerCase();
  let category = "Meals";

  if (
    name.includes("chai") ||
    name.includes("coffee") ||
    name.includes("tea") ||
    name.includes("pepsi") ||
    name.includes("coke") ||
    name.includes("fanta") ||
    name.includes("sprite") ||
    name.includes("maaza") ||
    name.includes("slice") ||
    name.includes("lassi")
  ) {
    category = "Beverages";
  } else if (
    name.includes("momo") ||
    name.includes("samosa") ||
    name.includes("fries") ||
    name.includes("patties") ||
    name.includes("roll") ||
    name.includes("chaat") ||
    name.includes("pani puri") ||
    name.includes("poha") ||
    name.includes("bun maska")
  ) {
    category = "Snacks";
  } else if (
    name.includes("burger") ||
    name.includes("pizza") ||
    name.includes("noodles") ||
    name.includes("pasta") ||
    name.includes("chaap")
  ) {
    category = "Fast Food";
  } else if (
    name.includes("fruit") ||
    name.includes("yoghurt") ||
    name.includes("salad")
  ) {
    category = "Healthy Food";
  }

  // Determine vegetarian status from the food name
  const nonVegKeywords = [
    "chicken",
    "mutton",
    "fish",
    "egg",
    "prawn",
    "meat",
    "beef",
    "pork",
    "keema",
    "tandoori chicken",
    "butter chicken",
  ];

  const isVeg = !nonVegKeywords.some((keyword) =>
    name.includes(keyword)
  );

  // Availability is not provided by Google Sheets.
  // Keep this field for compatibility with the existing UI.
  const available = true;

  const popularItems = [
    "masala dosa",
    "paneer",
    "momos",
    "chai",
    "coffee",
    "chole bhature",
    "vada pav",
    "samosa",
  ];

  const popular = popularItems.some((item) =>
    name.includes(item)
  );

  const categoryImages: Record<string, string> = {
    Meals:
      "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
    Snacks:
      "https://images.unsplash.com/photo-1625220194771-7ebdea0b70b9?auto=format&fit=crop&w=900&q=85",
    Beverages:
      "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?auto=format&fit=crop&w=900&q=85",
    "Fast Food":
      "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
    Desserts:
      "https://images.unsplash.com/photo-1562376552-0d160a2f238d?auto=format&fit=crop&w=900&q=85",
    "Healthy Food":
      "https://images.unsplash.com/photo-1511690656952-34342bb7c2f2?auto=format&fit=crop&w=900&q=85",
  };

  const reason = [
    item.flavour,
    item.spice_level,
  ]
    .filter(Boolean)
    .join(", ");

  return {
    id: `${item.food_court}-${item.food_items}-${index}`,
    name: item.food_items
      .split(" ")
      .map(
        (word) =>
          word.charAt(0).toUpperCase() + word.slice(1)
      )
      .join(" "),
    price: item.price,
    outlet: item.shop_name || item.food_court,
    category,
    foodCourt: item.food_court,
    flavour: item.flavour,
    spiceLevel: item.spice_level,
    veg: isVeg,
    available,
    image: categoryImages[category] || categoryImages["Meals"],
    popular,
    reason,
  };
}

// Fetch menu items from Google Sheets through backend
export async function fetchMenuItems(): Promise<MenuItem[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/menu`);

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data: MenuApiResponse = await response.json();

    if (!data.success) {
      throw new Error("API returned an unsuccessful response.");
    }

    return data.items.map((item, index) =>
      transformMenuItem(item, index)
    );
  } catch (error) {
    console.error("Failed to fetch menu items:", error);
    throw error;
  }
}

// Send message to UniEats AI chatbot
export async function sendChatMessage(
  message: string,
  conversationId?: string
): Promise<{
  reply: string;
  conversationId: string;
  recommendations: MenuItem[];
}> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/chat`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        message,
        conversationId,
      }),
    });

    const data: ChatApiResponse = await response.json();

    if (!response.ok || !data.success) {
      throw new Error(
        data.message || "Unable to get a response from Uni."
      );
    }

    return {
      reply: data.reply,
      conversationId: data.conversationId,
      recommendations: (data.recommendations || []).map(
        (item, index) => transformMenuItem(item, index)
      ),
    };
  } catch (error) {
    console.error("Chat API error:", error);
    throw error;
  }
}

// Backend health check
export async function healthCheck(): Promise<boolean> {
  try {
    const response = await fetch(`${API_BASE_URL}/health`);
    return response.ok;
  } catch {
    return false;
  }
}
