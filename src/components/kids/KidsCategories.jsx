import GenreCard from '../genres/GenreCard';
import { KIDS_CATEGORIES } from '../../data/categories';

export default function KidsCategories({ images }) {
  return (
    <section className="px-4 py-6 sm:px-8">
      <h2 className="mb-3 text-lg font-semibold text-white sm:text-xl">Browse by Category</h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-5">
        {KIDS_CATEGORIES.map((category) => (
          <GenreCard
            key={category.id}
            genre={{ ...category, image: images?.[category.id] }}
            basePath="/kids"
            withDescription
          />
        ))}
      </div>
    </section>
  );
}
