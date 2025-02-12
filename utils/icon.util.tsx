import {
    ArrowDownUp,
    ArrowLeftRight,
    Baby,
    Backpack,
    Banknote,
    BriefcaseBusiness,
    Building2,
    Calendar,
    Circle,
    CircleDollarSign,
    Coins,
    CreditCard,
    Fuel,
    GraduationCap,
    HeartPulse,
    Hotel,
    Layers,
    PiggyBank,
    Plane,
    Star,
} from "lucide-react";

export const getIcon = (tabName: string) => {
    switch (tabName) {
        case "deposit":
            return <CircleDollarSign size={16} />;
        case "credit":
            return <CreditCard size={16} />;
        case "childrensSavings":
            return <Baby size={16} />;
        case "savings":
            return <PiggyBank size={16} />;
        case "healthSavings":
            return <HeartPulse size={16} />;
        case "businessSavings":
            return <BriefcaseBusiness size={16} />;
        case "businessChecking":
        case "business":
            return <Building2 size={16} />;
        case "rewardChecking":
        case "rewards":
            return <Coins size={16} />;
        case "installmentSavings":
            return <Layers size={16} />;
        case "airline":
            return <Plane size={16} />;
        case "student":
            return <GraduationCap size={16} />;
        case "travel":
            return <Backpack size={16} />;
        case "zeroInterest":
            return <Circle size={16} />;
        case "transfer":
            return <ArrowDownUp size={16} />;
        case "best":
            return <Star size={16} />;
        case "gas":
            return <Fuel size={16} />;
        case "hotel":
            return <Hotel size={16} />;
        case "noForeignTransactionFee":
            return <ArrowLeftRight size={16} />;
        case "noAnnualFee":
            return <Calendar size={16} />;
        default:
            return <Banknote size={16} />;
    }
};