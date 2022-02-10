import useAuth from "../hooks/useAuth";

export const isStaff = () => {
    const { isSupport, isMaintenance } = useAuth();

    if(isMaintenance || isSupport){
        return true;
    }
    return '/';
}

export const isAdmin = () => {
    const { isAdmin } = useAuth();
    console.log(isAdmin)
    if (isAdmin) {
        return true;
    }
    return '/';
}