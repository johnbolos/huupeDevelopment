interface Installer   {
    id: number
    name: string
    lat: number
    lng: number
    state: string
    email?: string
    phone: string
    website?: string
  }

  interface LatLng {
    lat: number
    lng: number
  }

interface huupesTypes {
  product: string;
  desktopOrder: string;
  mobileIndex: number;
  price: string;
  info: string;
  description: string[];
  data: {
    name: string
    details: {
      title: string
      content: string
    } []
  } []
};

interface Testimony {
      video: string;
      img: string;
      height: string;
      width: string;
      title: string;
      name?: string;
      stars: number
      altText: string;
    }
