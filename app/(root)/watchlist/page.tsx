import Image from "next/image";
import Link from "next/link";
import SearchCommand from "@/components/SearchCommand";
import { searchStocks } from "@/lib/actions/finnhub.actions";
import { Star } from 'lucide-react';
import { WatchlistTable } from "@/components/WatchlistTable";
import { getWatchlistWithData } from "@/lib/actions/watchlist.actions";

const WatchlistPage = async () => {
    const watchlist = await getWatchlistWithData();
    const initialStocks = await searchStocks();


    if (!watchlist.length) {
        return (
            <section className="flex flex-col items-center justify-center gap-6 py-16">
                <Image src="/assets/icons/star.svg" alt="Empty watchlist" width={64} height={64} />
                <div className="text-center space-y-2">
                    <h1 className="text-2xl font-semibold text-gray-100">Your Watchlist</h1>
                    <p className="text-gray-400 max-w-md">
                        Your watchlist is empty. Search for stocks and click the star to add them.
                    </p>
                </div>
                <div className="flex gap-3">
                    <SearchCommand label="Add stock" initialStocks={initialStocks} />
                    <Link href="/" className="search-btn inline-flex items-center">Go to Dashboard</Link>
                </div>
            </section>
        );
    }

    return (
        <section className="space-y-6">
            <div className="flex items-center justify-between">
                <h1 className="text-2xl font-semibold text-gray-100">Watchlist</h1>
                <SearchCommand label="Add stock" initialStocks={initialStocks} />
            </div>

            {/* Placeholder for the watchlist table */}
            <div className="rounded-md border border-gray-800 bg-[#0F0F0F] p-6">
                <div className="text-gray-500">Watchlist table will appear here.</div>
            </div>
        </section>
    );
}

const Watchlist = async () => {
    const watchlist = await getWatchlistWithData();
    const initialStocks = await searchStocks();
  
    // Empty state
    if (watchlist.length === 0) {
      return (
        <section className="flex watchlist-empty-container">
          <div className="watchlist-empty">
            <Star className="watchlist-star" />
            <h2 className="empty-title">Your watchlist is empty</h2>
            <p className="empty-description">
              Start building your watchlist by searching for stocks and clicking the star icon to add them.
            </p>
          </div>
          <SearchCommand initialStocks={initialStocks} />
        </section>
      );
    }
  
    return (
      <section className="watchlist">
        <div className="flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <h2 className="watchlist-title">Watchlist</h2>
            <SearchCommand initialStocks={initialStocks} />
          </div>
          <WatchlistTable watchlist={watchlist} />
        </div>
      </section>
    );
  };

  export default Watchlist;