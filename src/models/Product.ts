export interface Product {
  id: number;
  name: string;
  price: string;
  originalPrice: string;
  rating: number;
  image: string;
  badge: string;
  type: 'new' | 'promotion' | 'occasion' | 'regular';
  category: 'telephone' | 'ordinateur' | 'accessoires';
  description?: string;
}

export class ProductModel implements Product {
  constructor(
    public id: number,
    public name: string,
    public price: string,
    public originalPrice: string,
    public rating: number,
    public image: string,
    public badge: string,
    public type: 'new' | 'promotion' | 'occasion' | 'regular',
    public category: 'telephone' | 'ordinateur' | 'accessoires',
    public description: string = ''
  ) {}

  isOnPromotion(): boolean {
    return this.type === 'promotion';
  }

  isNew(): boolean {
    return this.type === 'new';
  }
}