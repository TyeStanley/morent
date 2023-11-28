import {
  MouseEventHandler,
  ChangeEvent,
  Dispatch,
  SetStateAction,
  FormEvent,
} from "react";

export interface ButtonProps {
  title: string;
  bgColor: string;
  textColor: string;
  borderColor?: string;
  leftIcon?: string;
  extraStyles?: string;
  btnType?: "button" | "submit";
  disabled?: boolean;
  isLoading?: boolean;
  handleClick?: MouseEventHandler<HTMLButtonElement>;
}

export interface NavModalProps {
  isNavOpen: boolean;
  setIsNavOpen: (arg: boolean) => void;
}

export interface SearchTimeProps {
  time: string;
  setTime: (time: string) => void;
}

export interface SearchLocationProps {
  location: string;
  setLocation: (location: string) => void;
}

export interface CarCardProps {
  _id?: string;
  id?: string;
  title: string;
  type: string;
  images: string[];
  fuel: number;
  transmission: string;
  people: string;
  price: number;
  priceBeforeDiscount?: string;
  description?: string;
  isRented?: boolean;
}

export interface ModalDataProps {
  id?: string;
  carNameData: string;
  carTypeData: string;
  images: Array<string>;
  gasData: number;
  transmissionData: string;
  passengerCountData: string;
  priceData: number;
  priceBeforeDiscountData?: string;
  descriptionData?: string;
  isRented?: boolean;
}

export interface AdCardProps {
  title: string;
  subtitle: string;
  backgroundImage: string;
  carImage: string;
  additionalStyles?: string;
}

export interface Checked {
  [key: string]: boolean;
}

export interface SearchFilterProps {
  isOpen: boolean;
  setIsOpen: (prev: boolean) => void;
  inputData?: string;
  handleInputData?: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SearchFilterModalProps {
  isOpen: boolean;
  setIsOpen: (prev: boolean) => void;
  onHandleChange: (e: ChangeEvent<HTMLInputElement>) => void;
  checked: Checked;
  sliderValue: number;
  handleSliderChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface CarRentInputProps {
  label: string;
  placeholder?: string;
  name: string;
  register: any;
}

export interface ThemeToggleProps {
  setIsDarkMode: (theme: string) => void;
}

export type CarFormInputs = {
  title: string;
  type: string;
  price: number;
  people: string;
  transmission: string;
  location: string;
  fuel: number;
  description: string;
  images: string[];
};

export interface UpdateUserParams {
  userId: string;
  name: string;
  image: string;
  role: string;
  coverImage: string;
  path: string;
}

export interface OnboardingQuestionProps {
  onboarding: string;
  setOnboarding: (onboarding: string) => void;
}

export interface OnboardingProps {
  user: {
    id: string;
    objectId: string;
    name: string;
    image: string;
    coverImage: string;
  };
}

export interface CarTypes {
  title: string;
  type: string;
  price: number;
  people: string;
  transmission: string;
  location: string;
  fuel: number;
  description: string;
  images: string[];
}

export interface PickDropCardProps {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  availabilityFrom: string;
  setAvailabilityFrom: Dispatch<SetStateAction<string>>;
  availabilityTo: string;
  setAvailabilityTo: Dispatch<SetStateAction<string>>;
  handleSubmit: (e: FormEvent) => void;
}

export interface CarSearchProps {
  carName?: string;
  carType?: Checked;
  maxPrice?: number;
  location: string;
  availabilityFrom: string;
  availabilityTo: string;
}

export interface SearchDateProps {
  availability: string;
  setAvailability: Dispatch<SetStateAction<string>>;
}

export interface AvailabilityInputProps {
  text: string;
  availability: string;
  setAvailability: Dispatch<SetStateAction<string>>;
}

export interface CarDetailsModalProps {
  setIsOpen: (prev: boolean) => void;
  data: ModalDataProps;
}

export interface ProfileUserProps {
  name: string;
  role: string;
  image: string;
  coverImage: string;
  rentedCars: string[];
  ownedCars: string[];
}

export interface ProfileCarsProps {
  _id: string;
  title: string;
  type: string;
  images: string[];
  fuel: number;
  transmission: string;
  people: string;
  price: number;
  priceBeforeDiscount?: string;
  description?: string;
  isRented?: boolean;
}

export interface ProfileUserData {
  user: ProfileUserProps;
  rentedCars: ProfileCarsProps[];
  ownedCars: ProfileCarsProps[];
  likedCars: ProfileCarsProps[];
}
