export interface Ville {
    id: number;
    name: string;
    discount: string;
    category: string;
    description: string;
    price: string;
  }
  
export interface Appartement {
  id: number;
  nombrePiece: number;
  loyer: string;
  numeroAppartement: string;
  details: string;
    numeroEtatge: string;
    occupe: number;
  }
  
export interface User {
    id: number;
    role: string;
    token: string;
  }
  
export interface Civilite {
    id: number;
    code: string;
    libelle: string;
  }

  export interface Menu {
    id: number;
    libelle: string;
    code: string;
  }
  
  export interface ConfigurationMenu {
    libelle: string;
    id: number;
    menu_directe: Menu[];
    sous_menu: {
      libelle: string;
      menus: Menu[];
    }[];
  }