export default function HomePlaceHolder() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Category Menu Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Home button placeholder */}
          <div className="mb-6 text-center">
            <div className="w-20 h-10 bg-gray-200 rounded-lg mx-auto animate-pulse"></div>
          </div>
          
          {/* Categories grid placeholder */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {Array.from({ length: 6 }, (_, index) => (
              <div key={index} className="group animate-pulse">
                <div className="bg-gray-200 p-6 rounded-xl text-center">
                  <div className="w-8 h-8 bg-gray-300 rounded mx-auto mb-3"></div>
                  <div className="h-4 bg-gray-300 rounded w-16 mx-auto"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products Placeholder */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Products Grid Placeholder */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {Array.from({ length: 9 }, (_, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
                {/* Image placeholder */}
                <div className="h-48 bg-gray-200 flex items-center justify-center">
                  <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
                </div>
                
                {/* Content placeholder */}
                <div className="p-6">
                  {/* Title placeholder */}
                  <div className="h-6 bg-gray-200 rounded mb-2"></div>
                  
                  {/* Rating placeholder */}
                  <div className="flex items-center mb-3">
                    <div className="flex space-x-1">
                      {Array.from({ length: 5 }, (_, i) => (
                        <div key={i} className="w-4 h-4 bg-gray-200 rounded"></div>
                      ))}
                    </div>
                    <div className="w-8 h-4 bg-gray-200 rounded ml-2"></div>
                  </div>
                  
                  {/* Price and button placeholder */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <div className="h-8 w-16 bg-gray-200 rounded"></div>
                      <div className="h-5 w-12 bg-gray-200 rounded"></div>
                    </div>
                    <div className="w-24 h-10 bg-gray-200 rounded-lg"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Placeholder */}
          <div className="flex justify-center items-center mt-12 space-x-2">
            <div className="w-20 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-8 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-8 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-8 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
            <div className="w-16 h-10 bg-gray-200 rounded-lg animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Special Offers Placeholder */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-gray-200 rounded-2xl p-8 md:p-12 animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="h-10 bg-gray-300 rounded mb-4 w-3/4"></div>
                <div className="h-6 bg-gray-300 rounded mb-6 w-full"></div>
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="w-32 h-12 bg-gray-300 rounded-lg"></div>
                  <div className="w-40 h-6 bg-gray-300 rounded"></div>
                </div>
              </div>
              <div className="text-center">
                <div className="w-20 h-20 bg-gray-300 rounded-full mx-auto mb-4"></div>
                <div className="h-12 w-32 bg-gray-300 rounded mx-auto"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Placeholder */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.from({ length: 3 }, (_, index) => (
              <div key={index} className="text-center p-6 bg-white rounded-xl shadow-sm animate-pulse">
                <div className="w-12 h-12 bg-gray-200 rounded-full mx-auto mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4 mx-auto"></div>
                <div className="h-4 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}