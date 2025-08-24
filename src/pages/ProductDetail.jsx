import { useParams, Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Products from "../assets/Products.json";

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedImage, setSelectedImage] = useState(0);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    // Trouver le produit par ID
    const foundProduct = Products.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);

      // Trouver des produits similaires (même catégorie)
      const related = Products.filter(
        (p) => p.category === foundProduct.category && p.id !== foundProduct.id
      ).slice(0, 4);
      setRelatedProducts(related);
    }
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Produit non trouvé
          </h2>
          <Link
            to="/"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors duration-300 font-medium"
          >
            Retour à l'accueil
          </Link>
        </div>
      </div>
    );
  }

  const discountPercentage = Math.round(
    ((parseInt(product.originalPrice.replace("FCFA", "")) -
      parseInt(product.price.replace("FCFA", ""))) /
      parseInt(product.originalPrice.replace("FCFA", ""))) *
      100
  );

  const handleAddToCart = () => {
    // Logique d'ajout au panier
    alert(`${quantity} x ${product.name} ajouté au panier!`);
  };

  const handleBuyNow = () => {
    // Logique d'achat immédiat
    navigate("/checkout");
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex text-sm text-gray-600">
            <Link to="/" className="hover:text-blue-600 transition-colors">
              Accueil
            </Link>
            <span className="mx-2">/</span>
            <Link
              to={`/category/${product.category}`}
              className="hover:text-blue-600 transition-colors capitalize"
            >
              {product.category}
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images Section */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center relative">
                <span className="text-8xl">{product.image}</span>
                {product.badge && (
                  <span className="absolute top-6 left-6 bg-blue-600 text-white px-4 py-2 rounded-full text-sm font-bold">
                    {product.badge}
                  </span>
                )}
                {discountPercentage > 0 && (
                  <span className="absolute top-6 right-6 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{discountPercentage}%
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {[...Array(4)].map((_, index) => (
                <div
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-white rounded-lg border-2 cursor-pointer transition-all duration-300 ${
                    selectedImage === index
                      ? "border-blue-600 shadow-lg"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <div className="h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded-md flex items-center justify-center">
                    <span className="text-2xl">{product.image}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Info Section */}
          <div className="space-y-6">
            {/* Title and Rating */}
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                {product.name}
              </h1>
              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  <div className="flex text-yellow-400 text-lg">
                    {"★★★★★".slice(0, Math.floor(product.rating))}
                  </div>
                  <span className="text-gray-600 ml-2">({product.rating})</span>
                </div>
                <span className="text-gray-400">|</span>
                <span className="text-gray-600 text-sm">127 avis</span>
                <span className="text-gray-400">|</span>
                <span className="text-green-600 text-sm font-medium">
                  En stock
                </span>
              </div>
            </div>

            {/* Price */}
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-2">
                <span className="text-3xl font-bold text-blue-600">
                  {product.price}
                </span>
                {product.originalPrice !== product.price && (
                  <>
                    <span className="text-xl text-gray-400 line-through">
                      {product.originalPrice}
                    </span>
                    <span className="bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-bold">
                      Économisez {discountPercentage}%
                    </span>
                  </>
                )}
              </div>
              <p className="text-gray-600 text-sm">
                TVA incluse • Livraison gratuite
              </p>
            </div>

            {/* Product Features */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <h3 className="font-semibold text-gray-900 mb-4">
                Caractéristiques
              </h3>
              <ul className="space-y-2 text-gray-600">
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Garantie 2 ans
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Livraison rapide 24-48h
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Support technique 7j/7
                </li>
                <li className="flex items-center">
                  <svg
                    className="w-5 h-5 text-green-500 mr-3"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Retour gratuit 30 jours
                </li>
              </ul>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="bg-white rounded-xl p-6 border border-gray-200">
              <div className="flex items-center space-x-4 mb-6">
                <label className="text-gray-700 font-medium">Quantité:</label>
                <div className="flex items-center border border-gray-300 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 min-w-[60px] text-center font-medium">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="px-3 py-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  🛒 Ajouter au panier
                </button>
                <button
                  onClick={handleBuyNow}
                  className="flex-1 bg-green-600 text-white py-3 px-6 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium text-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  ⚡ Acheter maintenant
                </button>
              </div>
            </div>

            {/* Additional Actions */}
            <div className="flex items-center justify-center space-x-8 py-4">
              <button className="flex items-center space-x-2 text-gray-600 hover:text-red-500 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
                <span>Favoris</span>
              </button>
              <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-500 transition-colors">
                <svg
                  className="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z"
                  />
                </svg>
                <span>Partager</span>
              </button>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="mt-16">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                Produits similaires
              </h2>
              <Link
                to={`/category/${product.category}`}
                className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1"
              >
                <span>Voir tout</span>
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <Link
                  key={relatedProduct.id}
                  to={`/product/${relatedProduct.id}`}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 overflow-hidden"
                >
                  <div className="relative">
                    <div className="h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                      <span className="text-4xl">{relatedProduct.image}</span>
                    </div>
                    <span className="absolute top-4 left-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-medium">
                      {relatedProduct.badge}
                    </span>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
                      {relatedProduct.name}
                    </h3>
                    <div className="flex items-center mb-2">
                      <div className="flex text-yellow-400 text-sm">
                        {"★★★★★".slice(0, Math.floor(relatedProduct.rating))}
                      </div>
                      <span className="text-gray-600 text-sm ml-1">
                        ({relatedProduct.rating})
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-lg font-bold text-blue-600">
                          {relatedProduct.price}
                        </span>
                        {relatedProduct.originalPrice !==
                          relatedProduct.price && (
                          <span className="text-sm text-gray-400 line-through ml-2">
                            {relatedProduct.originalPrice}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
