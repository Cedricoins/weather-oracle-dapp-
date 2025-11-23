"use client";

import { useState } from "react";

export default function WeatherPredictor() {
  const [selections, setSelections] = useState({
    temp: "", pressure: "", clouds: "", wind: "", humidity: "", front: ""
  });
  const [prediction, setPrediction] = useState("");

  const options = {
    temp: [
      { v: "cold", l: "Froide (<10°C)", s: -1 },
      { v: "mild", l: "Douce (10-20°C)", s: 1 },
      { v: "warm", l: "Chaude (20-30°C)", s: 1 },
      { v: "hot", l: "Très chaude (>30°C)", s: 0 }
    ],
    pressure: [
      { v: "high", l: "Haute (>1020 hPa)", s: 2 },
      { v: "normal", l: "Normale", s: 0 },
      { v: "low", l: "Basse", s: -2 },
      { v: "verylow", l: "Très basse", s: -3 }
    ],
    clouds: [
      { v: "clear", l: "Ciel clair", s: 2 },
      { v: "partial", l: "Nuages épars", s: 0 },
      { v: "overcast", l: "Couvert", s: -1 },
      { v: "dense", l: "Très nuageux", s: -2 }
    ],
    wind: [
      { v: "calm", l: "Calme", s: 1 },
      { v: "light", l: "Léger", s: 0 },
      { v: "moderate", l: "Modéré", s: -1 },
      { v: "strong", l: "Fort", s: -2 }
    ],
    humidity: [
      { v: "low", l: "Faible (<40%)", s: 1 },
      { v: "medium", l: "Moyenne", s: 0 },
      { v: "high", l: "Élevée", s: -1 },
      { v: "veryhigh", l: "Très élevée (>80%)", s: -2 }
    ],
    front: [
      { v: "none", l: "Aucun front", s: 2 },
      { v: "warm", l: "Front chaud", s: -1 },
      { v: "cold", l: "Front froid", s: -2 },
      { v: "occluded", l: "Occlus", s: -2 },
      { v: "stationary", l: "Stationnaire", s: 0 }
    ]
  };

  const isComplete = Object.values(selections).every(v => v !== "");

  const handleChange = (key: string, value: string) => {
    setSelections(prev => ({ ...prev, [key]: value }));
    setPrediction("");
  };

  const calculatePrediction = () => {
    let score = 0;
    Object.keys(selections).forEach((key) => {
      const selected = options[key as keyof typeof options].find(o => o.v === selections[key as keyof typeof selections]);
      if (selected) score += selected.s;
    });

    const predictions = [
      { min: 8, text: "Paradis absolu : grand soleil, ciel bleu azur !" },
      { min: 5, text: "Superbe journée ensoleillée, profitez-en !" },
      { min: 2, text: "Beau temps avec quelques nuages décoratifs" },
      { min: 0, text: "Météo correcte, mais variable" },
      { min: -3, text: "Ciel gris, parapluie recommandé" },
      { min: -6, text: "Pluie et vent : restez chez vous !" },
      { min: -10, text: "Tempête apocalyptique en approche !" }
    ];

    const pred = predictions.find(p => score >= p.min) || predictions[predictions.length - 1];
    setPrediction(pred.text + ` (Score: ${score}/12)`);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="bg-white/90 backdrop-blur rounded-2xl shadow-2xl p-8 border border-white/50">
        <h1 className="text-4xl font-bold text-center mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
          Prédicteur Météo Oracle
        </h1>
        <p className="text-center text-gray-600 mb-8">Choisissez 6 indices pour connaître le temps demain</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {Object.entries(options).map(([key, opts]) => (
            <div key={key}>
              <label className="block text-sm font-semibold text-gray-700 mb-2 capitalize">
                {key === "temp" ? "Température" :
                 key === "pressure" ? "Pression" :
                 key === "clouds" ? "Nuages" :
                 key === "wind" ? "Vent" :
                 key === "humidity" ? "Humidité" :
                 "Front météo"}
              </label>
              <select
                value={selections[key as keyof typeof selections]}
                onChange={(e) => handleChange(key, e.target.value)}
                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition"
              >
                <option value="">Sélectionner...</option>
                {opts.map(o => (
                  <option key={o.v} value={o.v}>{o.l}</option>
                ))}
              </select>
            </div>
          ))}
        </div>

        <button
          onClick={calculatePrediction}
          disabled={!isComplete}
          className={`w-full py-4 rounded-xl font-bold text-lg transition ${
            isComplete
              ? "bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:from-blue-700 hover:to-indigo-700 shadow-lg"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
        >
          {isComplete ? "Prédire la météo" : "Complétez tous les champs"}
        </button>

        {prediction && (
          <div className="mt-8 p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-xl">
            <h2 className="text-2xl font-bold text-green-800 mb-3">Demain :</h2>
            <p className="text-xl text-green-700">{prediction}</p>
          </div>
        )}

        <div className="mt-8 text-center text-xs text-gray-500">
          Contrat Solidity déployable séparément • Score calculé localement
        </div>
      </div>
    </div>
  );
}
