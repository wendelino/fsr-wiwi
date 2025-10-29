"use client";

import { useState, useEffect } from "react";
import { getMensaMeals, rateMeal } from "@/app/_actions/mensa";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Settings } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import Meal from "@/components/meal";

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

type UserRating = {
  mealId: string;
  rating: number;
  date: string;
};

type MensaPreferences = {
  selectedMensas: string[];
};

export default function MensaView({mensaData}: {mensaData: GET_MensaMealType[]}) { 
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [loading, setLoading] = useState(false);
  const [userRatings, setUserRatings] = useState<UserRating[]>([]);
  const [mensaPreferences, setMensaPreferences] = useState<MensaPreferences>({ selectedMensas: [] });
  const [showPreferences, setShowPreferences] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load user ratings and preferences from localStorage
  useEffect(() => {
    const savedRatings = localStorage.getItem('mensa-ratings');
    const savedPreferences = localStorage.getItem('mensa-preferences');
    
    if (savedRatings) {
      setUserRatings(JSON.parse(savedRatings));
    }
    
    if (savedPreferences) {
      setMensaPreferences(JSON.parse(savedPreferences));
    }
    
    setIsInitialized(true);
  }, []);

  // Save preferences to localStorage
  const savePreferences = (preferences: MensaPreferences) => {
    setMensaPreferences(preferences);
    localStorage.setItem('mensa-preferences', JSON.stringify(preferences));
  };

  // Save rating to localStorage
  const saveRating = (mealId: string, rating: number) => {
    const newRating: UserRating = {
      mealId,
      rating,
      date: selectedDate
    };
    
    const updatedRatings = userRatings.filter(r => !(r.mealId === mealId && r.date === selectedDate));
    updatedRatings.push(newRating);
    
    setUserRatings(updatedRatings);
    localStorage.setItem('mensa-ratings', JSON.stringify(updatedRatings));
  };

  // Get user rating for a meal
  const getUserRating = (mealId: string) => {
    return userRatings.find(r => r.mealId === mealId && r.date === selectedDate)?.rating;
  };

  // Handle rating submission
  const handleRateMeal = async (mealId: string, rating: number) => {
    try {
      await rateMeal({ mealId, rating });
      saveRating(mealId, rating);
    } catch (error) {
      console.error('Error rating meal:', error);
      // Still save locally even if server request fails
      saveRating(mealId, rating);
    }
  };
  

  // Filter mensas based on preferences - only after initialization to prevent flash
  const filteredMensaData = !isInitialized ? [] : mensaData.filter(mensa => 
    mensaPreferences.selectedMensas.length === 0 || 
    mensaPreferences.selectedMensas.includes(mensa.mensa.id)
  );

  // Get all available mensa IDs for preferences
  const allMensaIds = mensaData.map(m => m.mensa.id);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h1 className="text-3xl font-bold">Mensa</h1>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setShowPreferences(true)}
              className={`flex items-center gap-2 ${
                mensaPreferences.selectedMensas.length > 0 
                  ? 'border-primary bg-primary/10 text-primary' 
                  : ''
              }`}
            >
              <Settings className="h-4 w-4" />
              Präferenzen
              {mensaPreferences.selectedMensas.length > 0 && (
                <span className="ml-1 px-1.5 py-0.5 text-xs bg-primary text-primary-foreground rounded-full">
                  {mensaPreferences.selectedMensas.length}
                </span>
              )}
            </Button>
          </div>
        </div>

        {/* Date Selector */}
        <div className="flex items-center gap-4">
          <Calendar className="h-5 w-5" />
          <Input
            type="date"
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-auto"
          />
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
            <p className="mt-2 text-muted-foreground">Lade Mensa-Daten...</p>
          </div>
        )}

        {/* Mensa Data */}
        {!loading && filteredMensaData.length === 0 && (
          <div className="text-center py-8">
            <p className="text-muted-foreground">Keine Mensa-Daten für das ausgewählte Datum verfügbar.</p>
          </div>
        )}

        {!loading && filteredMensaData.map((mensa) => (
          <div key={mensa.mensa.id} className="space-y-4">
            <h2 className="text-2xl font-semibold">{mensa.mensa.name}</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {mensa.meals.map((meal) => (
                <Meal
                  key={meal.mealId}
                  meal={meal}
                  userRating={getUserRating(meal.mealId)}
                  onRateMeal={handleRateMeal}
                />
              ))}
            </div>
          </div>
        ))}

        {/* Preferences Dialog */}
        <Dialog open={showPreferences} onOpenChange={setShowPreferences}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Mensa-Präferenzen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">
                Wähle die Mensas aus, die angezeigt werden sollen. Wenn keine ausgewählt sind, werden alle angezeigt.
              </p>
              
              <div className="space-y-2">
                {mensaData.map((mensa) => (
                  <div key={mensa.mensa.id} className="flex items-center space-x-2">
                    <Checkbox
                      id={mensa.mensa.id}
                      checked={mensaPreferences.selectedMensas.includes(mensa.mensa.id)}
                      onCheckedChange={(checked) => {
                        const newSelectedMensas = checked
                          ? [...mensaPreferences.selectedMensas, mensa.mensa.id]
                          : mensaPreferences.selectedMensas.filter(id => id !== mensa.mensa.id);
                        
                        savePreferences({ selectedMensas: newSelectedMensas });
                      }}
                    />
                    <label
                      htmlFor={mensa.mensa.id}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {mensa.mensa.name}
                    </label>
                  </div>
                ))}
              </div>
              
              <div className="flex justify-end gap-2">
                <Button
                  variant="outline"
                  onClick={() => savePreferences({ selectedMensas: [] })}
                >
                  Alle auswählen
                </Button>
                <Button
                  variant="outline"
                  onClick={() => savePreferences({ selectedMensas: allMensaIds })}
                >
                  Alle abwählen
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}