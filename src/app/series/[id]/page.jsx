import {
  getSeriesDetails,
  getSimilarSeries,
  getRecommendedSeries,
} from "../../../lib/tmdb";
import SeriesDetails from "../../../components/series/SeriesDetails";
import PageTransition from "@/components/PageTransition";

export async function generateMetadata({ params }) {
  const { id } = await params;
  try {
    const series = await getSeriesDetails(id);
    return {
      title: `${series.name} | Youflix`,
      description: series.overview?.slice(0, 150),
    };
  } catch {
    return { title: "Series | Youflix" };
  }
}

export default async function SeriesDetailsPage({ params }) {
  const { id } = await params;

  let series;
  try {
    series = await getSeriesDetails(id);
  } catch (err) {
    return (
      <div className="px-4 py-24 text-center text-gray-400">
        Couldn't load this title right now.
      </div>
    );
  }

  const [similar, recommended] = await Promise.all([
    getSimilarSeries(id).catch(() => []),
    getRecommendedSeries(id).catch(() => []),
  ]);

  return (
    <PageTransition>
      <SeriesDetails
        series={series}
        similar={similar}
        recommended={recommended}
      />
    </PageTransition>
  );
}
