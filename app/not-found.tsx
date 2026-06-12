import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import NotFoundView from './NotFoundView';

/**
 * OFF THE TRAIL — 404 (BRIEF §5). Full site chrome retained; the page
 * itself (wandering trail, compass, throwable headline) lives in the
 * co-located client view. Not a Field Volume — no VolumePlate/ChapterNav.
 */
export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="bg-bg text-ink">
        <NotFoundView />
      </main>
      <Footer />
    </>
  );
}
