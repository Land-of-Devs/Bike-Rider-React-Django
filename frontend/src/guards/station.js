import useStationAuth from "../hooks/useStationAuth";

export const isStation = () => {
    const { isStation } = useStationAuth();

    if (isStation) {
        return true;
    }

    return '/station/configure';
}
