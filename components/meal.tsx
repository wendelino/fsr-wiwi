"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useState } from "react";

type Meal = {
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
};

type MealProps = {
  meal: Meal;
  userRating?: number;
  onRateMeal: (mealId: string, rating: number) => void;
};

export default function Meal({ meal, userRating, onRateMeal }: MealProps) {
  const [selectedMeal, setSelectedMeal] = useState<Meal | null>(null);

  return (
    <Card className="overflow-hidden">
      <div className="aspect-video relative">
        <img
          src={meal.img_path}
          alt={meal.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{meal.name}</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold text-primary">
            {meal.prices.studi.toFixed(2)}€
          </span>
          {meal.ratings && (
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
              <span className="text-sm">
                {meal.ratings.average.toFixed(1)} ({meal.ratings.count})
              </span>
            </div>
          )}
        </div>
        
        {/* User Rating */}
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Deine Bewertung:</span>
          <div className="flex gap-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => onRateMeal(meal.mealId, star)}
                className="transition-colors"
              >
                <Star
                  className={`h-4 w-4 ${
                    star <= (userRating || 0)
                      ? 'fill-yellow-400 text-yellow-400'
                      : 'text-gray-300'
                  }`}
                />
              </button>
            ))}
          </div>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button 
              variant="outline" 
              className="w-full"
              onClick={() => setSelectedMeal(meal)}
            >
              Details anzeigen
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{meal.name}</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <div className="aspect-video relative">
                <img
                  src={meal.img_path}
                  alt={meal.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              
              {meal.food_addons && (
                <div>
                  <h4 className="font-semibold mb-2">Zusätze:</h4>
                  <p className="text-muted-foreground">{meal.food_addons}</p>
                </div>
              )}
              
              <div>
                <h4 className="font-semibold mb-2">Preise:</h4>
                <div className="grid grid-cols-3 gap-4">
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Student</p>
                    <p className="text-lg font-bold">{meal.prices.studi.toFixed(2)}€</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Mitarbeiter</p>
                    <p className="text-lg font-bold">{meal.prices.worker.toFixed(2)}€</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-muted-foreground">Gast</p>
                    <p className="text-lg font-bold">{meal.prices.guest.toFixed(2)}€</p>
                  </div>
                </div>
              </div>
              
              {meal.ratings && (
                <div>
                  <h4 className="font-semibold mb-2">Bewertungen:</h4>
                  <div className="flex items-center gap-2">
                    <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
                    <span className="text-lg font-semibold">
                      {meal.ratings.average.toFixed(1)}
                    </span>
                    <span className="text-muted-foreground">
                      ({meal.ratings.count} Bewertungen)
                    </span>
                  </div>
                </div>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
