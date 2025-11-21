import { useState, useEffect } from 'react';
import api from '../services/api';
import { ProductCard } from '../components/ProductCard';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, Filter, ChevronLeft, ChevronRight } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';

export function BrowseProducePage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // Search & Filter States
  const [keyword, setKeyword] = useState('');
  const [category, setCategory] = useState('All');
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  // Fetch Function
  const fetchProduce = async () => {
    setLoading(true);
    try {
      // Construct query string
      const params = new URLSearchParams();
      if (keyword) params.append('keyword', keyword);
      if (category && category !== 'All') params.append('category', category);
      params.append('pageNumber', page);

      const { data } = await api.get(`/api/produce?${params.toString()}`);
      
      setProducts(data.produce);
      setPage(data.page);
      setTotalPages(data.pages);
    } catch (error) {
      console.error('Error fetching produce:', error);
      toast.error('Failed to load produce listings');
    } finally {
      setLoading(false);
    }
  };

  // Re-fetch when page or category changes
  useEffect(() => {
    fetchProduce();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page, category]); 

  // Handle Search Submit
  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1); // Reset to page 1 on new search
    fetchProduce();
  };

  const categories = ['All', 'Vegetables', 'Fruits', 'Grains', 'Tubers', 'Poultry', 'Livestock'];

  return (
    <div className="space-y-8 py-8">
      {/* Header */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold">Browse Produce</h1>
        <p className="text-muted-foreground">Fresh from local farmers to your table.</p>
      </div>

      {/* Search & Filters Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center bg-muted/30 p-4 rounded-lg border">
        {/* Search Input */}
        <form onSubmit={handleSearch} className="relative w-full md:w-96">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items (e.g. Potatoes)"
            className="pl-8 bg-background"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
        </form>

        {/* Category Filter */}
        <div className="w-full md:w-48">
          <Select value={category} onValueChange={(val) => { setCategory(val); setPage(1); }}>
            <SelectTrigger className="bg-background">
              <Filter className="w-4 h-4 mr-2 text-muted-foreground" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map((c) => (
                <SelectItem key={c} value={c}>{c}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Search Button (Optional since Enter works, but good for UX) */}
        <Button onClick={handleSearch} className="w-full md:w-auto">
          Search
        </Button>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, i) => (
            <div key={i} className="h-80 bg-muted animate-pulse rounded-xl" />
          ))}
        </div>
      ) : products.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination Controls */}
          {totalPages > 1 && (
            <div className="flex justify-center items-center gap-4 pt-8">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.max(1, p - 1))}
                disabled={page === 1}
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              <span className="text-sm font-medium">
                Page {page} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                disabled={page === totalPages}
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          )}
        </>
      ) : (
        <div className="text-center py-20">
          <p className="text-xl text-muted-foreground">No produce found matching your filters.</p>
          <Button variant="link" onClick={() => { setKeyword(''); setCategory('All'); }}>
            Clear Filters
          </Button>
        </div>
      )}
    </div>
  );
}