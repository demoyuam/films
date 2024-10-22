'use client';

import React, { useState } from 'react';
import AnimeCard, { AnimeProp } from "@/components/AnimeCard";
import LoadMore from "../components/LoadMore";
import { data } from "./_data";

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [sortOption, setSortOption] = useState('');

  // Получаем список уникальных жанров из данных
  const genres = Array.from(new Set(data.flatMap((item) => item.genres)));

  // Фильтрация данных
  const filteredData = data
    .filter((item: AnimeProp) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter((item: AnimeProp) =>
      selectedGenre ? item.genres.includes(selectedGenre) : true
    );

  // Сортировка данных
  const sortedData = filteredData.sort((a: AnimeProp, b: AnimeProp) => {
    if (sortOption === 'title') {
      return a.title.localeCompare(b.title);
    } else if (sortOption === 'year') {
      return a.year - b.year;
    }
    return 0;
  });

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">Исследуйте Аниме</h2>

      {/* Поисковая строка */}
      <input
        type="text"
        placeholder="Поиск по названию..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="p-2 rounded border border-gray-300 text-black"
      />

      {/* Фильтр по жанру */}
      <select
        value={selectedGenre}
        onChange={(e) => setSelectedGenre(e.target.value)}
        className="p-2 rounded border border-gray-300 text-black"
      >
        <option value="">Все жанры</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>

      {/* Опции сортировки */}
      <select
        value={sortOption}
        onChange={(e) => setSortOption(e.target.value)}
        className="p-2 rounded border border-gray-300 text-black"
      >
        <option value="">Без сортировки</option>
        <option value="title">Сортировать по названию</option>
        <option value="year">Сортировать по году</option>
      </select>

      {/* Отображение данных */}
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