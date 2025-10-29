"use server";

type GET_MensaMealType = {
    mensa: {
      id: string;
      name: string;
      slug: string;
    };
    meals: {
      mealId: string;
      name: string;
      img_path: string;
      food_addons: string;
      prices: {
        studi: number;
        worker: number;
        guest: number;
      };
      ratings?: {
        average: number;
        count: number;
      };
    }[];
  };
  
export async function getMensaMeals(date?: string): Promise<GET_MensaMealType[]> {
  const BASE_URL = `${process.env.CMS_ENDPOINT}/mensa`;
  const token = process.env.CMS_TOKEN;
  
  try {
    const targetDate = date || new Date().toISOString().split('T')[0];
    const url = `${BASE_URL}/${targetDate}`;

    const response = await fetch(url, {
      next: {
        revalidate: 60,
      },
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      method: "GET",
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    return data.items;
  } catch (error) {
    console.log("Error fetching mensa meals", error);
    return [];
  }
}

export async function rateMeal(ctx: { mealId: string; rating: number }) {
  const BASE_URL = `${process.env.CMS_ENDPOINT}/mensa/rate`;
  const token = process.env.CMS_TOKEN;
  
  try {
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(ctx),
    });
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.log("Error rating meal", error);
    throw error;
  }
}

