"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

const shopItems = [
  { id: "hat1", name: "Wizard Hat", price: 500, emoji: "🧙‍♂️", type: "headwear" },
  { id: "hat2", name: "Crown", price: 1000, emoji: "👑", type: "headwear" },
  { id: "bg1", name: "Space Background", price: 300, emoji: "🌌", type: "background" },
  { id: "pet1", name: "Dragon Pet", price: 2000, emoji: "🐉", type: "companion" },
];

export default function RewardShop() {
  const router = useRouter();
  const [coins, setCoins] = useState(1240); // Mock starting XP/Coins
  const [owned, setOwned] = useState<string[]>(["bg1"]);

  const handleBuy = (item: any) => {
    if (coins >= item.price) {
      setCoins(coins - item.price);
      setOwned([...owned, item.id]);
      alert(`Successfully purchased ${item.name}!`);
    } else {
      alert("Not enough coins!");
    }
  };

  return (
    <div className="min-h-screen bg-purple-50 p-4 md:p-8">
      <header className="mb-8 bg-white p-6 rounded-2xl shadow-sm flex justify-between items-center border border-purple-100">
        <div>
          <h1 className="text-3xl font-extrabold text-purple-900">Reward Shop</h1>
          <p className="text-purple-600 font-medium">Spend your XP to customize your Avatar!</p>
        </div>
        <div className="flex items-center gap-4">
          <div className="bg-yellow-100 px-4 py-2 rounded-xl flex items-center gap-2 border-2 border-yellow-300">
            <span className="text-xl">⭐</span>
            <span className="text-xl font-bold text-yellow-700">{coins} XP</span>
          </div>
          <button onClick={() => router.push('/student')} className="text-purple-600 hover:underline font-bold">
            &larr; Back
          </button>
        </div>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        <div className="lg:col-span-1">
          <div className="bg-white p-6 rounded-3xl shadow-lg border-2 border-purple-200 text-center sticky top-8">
            <h2 className="text-xl font-bold mb-4">Your Avatar</h2>
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-2xl flex items-center justify-center text-7xl relative shadow-inner overflow-hidden">
              {owned.includes("bg1") && <div className="absolute inset-0 bg-blue-900 opacity-20">🌌</div>}
              {owned.includes("hat1") && <div className="absolute -top-4 text-5xl">🧙‍♂️</div>}
              {owned.includes("hat2") && <div className="absolute -top-6 text-6xl">👑</div>}
              <span className="relative z-10">👤</span>
              {owned.includes("pet1") && <div className="absolute bottom-2 right-2 text-4xl">🐉</div>}
            </div>
          </div>
        </div>

        <div className="lg:col-span-3">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {shopItems.map((item) => {
              const isOwned = owned.includes(item.id);
              return (
                <div key={item.id} className="bg-white p-6 rounded-3xl shadow-sm border border-gray-100 flex flex-col items-center justify-center text-center transition hover:shadow-md hover:-translate-y-1">
                  <div className="text-6xl mb-4">{item.emoji}</div>
                  <h3 className="font-bold text-lg text-gray-800">{item.name}</h3>
                  <p className="text-sm text-gray-500 uppercase font-medium mt-1">{item.type}</p>
                  
                  <div className="mt-6 w-full">
                    {isOwned ? (
                      <button disabled className="w-full py-2 bg-gray-200 text-gray-500 rounded-xl font-bold cursor-not-allowed">
                        Equipped
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleBuy(item)}
                        className={`w-full py-2 rounded-xl font-bold flex items-center justify-center gap-2 transition ${
                          coins >= item.price 
                            ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30' 
                            : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                        }`}
                      >
                        <span>⭐ {item.price}</span>
                        <span>Buy</span>
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
