'use client';

import React, { useState } from 'react';
import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import LoadMore from "../components/LoadMore";
import { data } from "./_data";

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const filteredData = data.filter((item: AnimeProp) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const sortedData = filteredData.sort((a: AnimeProp, b: AnimeProp) => {
    if (sortOption === 'name') {
      return a.name.localeCompare(b.name);
    } else if (sortOption === 'score') {
      return parseFloat(b.score) - parseFloat(a.score);
    } else if (sortOption === 'episodes') {
      return b.episodes - a.episodes;
    }
    return 0;
  });

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-5">
      <h2 className="text-3xl text-white font-bold">Исследуйте Аниме</h2>

      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded border border-gray-300 text-black"
      />

      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="p-2 rounded border border-gray-300 text-black"
      >
        <option value="">Без сортировки</option>
        <option value="name">Сортировать по названию</option>
        <option value="score">Сортировать по рейтингу</option>
        <option value="episodes">Сортировать по количеству эпизодов</option>
      </select>

      {sortedData.length === 0 ? (
        <p className="text-white">Аниме не найдено.</p>
      ) : (
        <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {sortedData.map((item: AnimeProp, index) => (
            <AnimeCard key={item.id} anime={item} index={index} />
          ))}
        </section>
      )}
      <LoadMore />
    </main>
  );
}

export default Home;