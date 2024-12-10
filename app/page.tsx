"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import {
  Sparkles,
  Music,
  Moon,
  Cigarette,
  Stethoscope,
  Book,
  Coffee,
  Dumbbell,
  Users,
  Bed,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

interface PredictionInput {
  likes_music: boolean;
  studies_at_night: boolean;
  smokes: boolean;
  health_issues: boolean;
  likes_reading: boolean;
  drinks_coffee: boolean;
  exercises_regularly: boolean;
  prefers_group_study: boolean;
}

interface User {
  id: string;
  name: string;
  score: number;
}

export default function EducationalRoommateMatcher() {
  const [input, setInput] = useState<PredictionInput>({
    likes_music: false,
    studies_at_night: false,
    smokes: false,
    health_issues: false,
    likes_reading: false,
    drinks_coffee: false,
    exercises_regularly: false,
    prefers_group_study: false,
  });
  const [results, setResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("preferences");

  const handleInputChange = (name: keyof PredictionInput) => {
    setInput((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/predict", input);
      setResults(data.prediction);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
      setActiveTab("results");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 flex flex-col items-center justify-center p-4">
      <h1 className="text-4xl font-bold text-white mb-8">Roomie Finder</h1>
      <Card className="w-full max-w-4xl">
        <CardContent className="p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="preferences">Your Preferences</TabsTrigger>
              <TabsTrigger value="results">Matches</TabsTrigger>
            </TabsList>
            <TabsContent value="preferences">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <ToggleOption
                    id="likes_music"
                    label="Likes Music"
                    description="Do you enjoy listening to music in your room?"
                    icon={<Music className="w-6 h-6" />}
                    checked={input.likes_music}
                    onCheckedChange={() => handleInputChange("likes_music")}
                  />
                  <ToggleOption
                    id="studies_at_night"
                    label="Night Owl"
                    description="Do you prefer studying at late night?"
                    icon={<Moon className="w-6 h-6" />}
                    checked={input.studies_at_night}
                    onCheckedChange={() =>
                      handleInputChange("studies_at_night")
                    }
                  />
                  <ToggleOption
                    id="smokes"
                    label="Smoker"
                    description="Are you a smoker?"
                    icon={<Cigarette className="w-6 h-6" />}
                    checked={input.smokes}
                    onCheckedChange={() => handleInputChange("smokes")}
                  />
                  <ToggleOption
                    id="health_issues"
                    label="Health Issues"
                    description="Do you have any health issues?"
                    icon={<Stethoscope className="w-6 h-6" />}
                    checked={input.health_issues}
                    onCheckedChange={() => handleInputChange("health_issues")}
                  />
                  <ToggleOption
                    id="likes_reading"
                    label="Do you read?"
                    description="Do you enjoy reading books in your free time?"
                    icon={<Book className="w-6 h-6" />}
                    checked={input.likes_reading}
                    onCheckedChange={() => handleInputChange("likes_reading")}
                  />
                  <ToggleOption
                    id="drinks_coffee"
                    label="Are you a lazy person?"
                    description="Do you sleep for long periods of time?"
                    icon={<Bed className="w-6 h-6" />}
                    checked={input.drinks_coffee}
                    onCheckedChange={() => handleInputChange("drinks_coffee")}
                  />
                  <ToggleOption
                    id="exercises_regularly"
                    label="Gymrat"
                    description="Do you exercise regularly?"
                    icon={<Dumbbell className="w-6 h-6" />}
                    checked={input.exercises_regularly}
                    onCheckedChange={() =>
                      handleInputChange("exercises_regularly")
                    }
                  />
                  <ToggleOption
                    id="prefers_group_study"
                    label="Prefer Group Study?"
                    description="Do you prefer studying in groups?"
                    icon={<Users className="w-6 h-6" />}
                    checked={input.prefers_group_study}
                    onCheckedChange={() =>
                      handleInputChange("prefers_group_study")
                    }
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? (
                    <span className="flex items-center justify-center">
                      <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                      Finding Matches...
                    </span>
                  ) : (
                    <span className="flex items-center justify-center">
                      <Sparkles className="mr-2 h-4 w-4" />
                      Find My Possible Roommates!
                    </span>
                  )}
                </Button>
              </form>
            </TabsContent>
            <TabsContent value="results">
              <AnimatePresence>
                {results.length === 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                    className="w-full h-full flex items-center justify-center p-4 mt-8"
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      No Matches Found!
                    </h3>
                  </motion.div>
                )}
                {results.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.5 }}
                  >
                    <h3 className="text-xl font-semibold mb-4">
                      Your Potential Roommates:
                    </h3>
                    <ul className="space-y-4">
                      {results.map((user, index) => (
                        <motion.li
                          key={user.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className={cn(
                            "p-4 bg-white rounded-lg shadow-md",
                            user.score > 0.75
                              ? "border-l-4 border-green-500"
                              : user.score > 0.5
                              ? "border-l-4 border-yellow-500"
                              : "border-l-4 border-red-500"
                          )}
                        >
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-lg font-medium">
                              {user.name}
                            </span>
                            <span className="text-sm text-muted-foreground">
                              ID: {user.id}
                            </span>
                          </div>
                          <Progress
                            value={user.score * 100}
                            className={cn(
                              "h-2",
                              user.score > 0.75
                                ? "border-l-4 border-green-500"
                                : user.score > 0.5
                                ? "border-l-4 border-yellow-500"
                                : "border-l-4 border-red-500"
                            )}
                          />
                          <div className="mt-2 text-sm text-right">
                            Compatibility: {(user.score * 100).toFixed(2)}%
                          </div>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                )}
              </AnimatePresence>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
}

interface ToggleOptionProps {
  id: string;
  label: string;
  description: string;
  icon: React.ReactNode;
  checked: boolean;
  onCheckedChange: () => void;
}

function ToggleOption({
  id,
  label,
  description,
  icon,
  checked,
  onCheckedChange,
}: ToggleOptionProps) {
  return (
    <div className="flex items-center space-x-4 bg-white p-4 rounded-lg shadow-sm">
      <div className="flex-shrink-0 text-blue-500">{icon}</div>
      <Label htmlFor={id} className="flex flex-col space-y-1 flex-grow">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
