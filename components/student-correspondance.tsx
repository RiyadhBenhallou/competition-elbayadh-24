"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { CardContent, Card } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import axios from "axios";
import { motion } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Music, Moon, Cigarette, Stethoscope } from "lucide-react";

interface PredictionInput {
  likes_music: boolean;
  studies_at_night: boolean;
  smokes: boolean;
  health_issues: boolean;
}

interface User {
  id: string;
  name: string;
}

export default function StudentCorrespondence() {
  const [input, setInput] = useState<PredictionInput>({
    likes_music: false,
    studies_at_night: false,
    smokes: false,
    health_issues: false,
  });
  const [results, setResults] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (name: keyof PredictionInput) => {
    setInput((prev) => ({ ...prev, [name]: !prev[name] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const { data } = await axios.post("http://localhost:5000/predict", {
        likes_music: input.likes_music,
        studies_at_night: input.studies_at_night,
        smokes: input.smokes,
        health_issues: input.health_issues,
      });
      setResults(data.prediction);
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardContent className="p-6">
          <h2 className="text-2xl font-bold text-center mb-6">
            Find Your Study Buddy!
          </h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <ToggleOption
              id="likes_music"
              label="Likes Music"
              description="Do you enjoy listening to music?"
              icon={<Music className="w-6 h-6" />}
              checked={input.likes_music}
              onCheckedChange={() => handleInputChange("likes_music")}
            />
            <ToggleOption
              id="studies_at_night"
              label="Night Owl"
              description="Do you prefer studying during night time?"
              icon={<Moon className="w-6 h-6" />}
              checked={input.studies_at_night}
              onCheckedChange={() => handleInputChange("studies_at_night")}
            />
            <ToggleOption
              id="smokes"
              label="Smoker"
              description="Do you smoke?"
              icon={<Cigarette className="w-6 h-6" />}
              checked={input.smokes}
              onCheckedChange={() => handleInputChange("smokes")}
            />
            <ToggleOption
              id="health_issues"
              label="Health Conscious"
              description="Do you have any health concerns?"
              icon={<Stethoscope className="w-6 h-6" />}
              checked={input.health_issues}
              onCheckedChange={() => handleInputChange("health_issues")}
            />
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <Sparkles className="mr-2 h-4 w-4 animate-spin" />
                  Finding Matches...
                </span>
              ) : (
                <span className="flex items-center justify-center">
                  <Sparkles className="mr-2 h-4 w-4" />
                  Find My Study Buddies!
                </span>
              )}
            </Button>
          </form>

          {results.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <h3 className="text-xl font-semibold mb-4">
                Your Study Buddies:
              </h3>
              <ul className="space-y-2">
                {results.map((user) => (
                  <motion.li
                    key={user.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex items-center p-3 bg-secondary rounded-lg shadow-md"
                  >
                    <span className="text-lg font-medium">{user.name}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
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
    <div className="flex items-center space-x-4">
      <div className="flex-shrink-0">{icon}</div>
      <Label htmlFor={id} className="flex flex-col space-y-1 flex-grow">
        <span className="font-medium">{label}</span>
        <span className="text-sm text-muted-foreground">{description}</span>
      </Label>
      <Switch id={id} checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
}
