export const fetchHolidays = async(): Promise<string[]> => {
    try{
        const year = new Date().getFullYear();

        const api = `https://feiertage-api.de/api/?jahr=${year}&nur_land=HE&nur_daten=1`;
        
        const response = await fetch(api);

        const data = await response.json();

        const dates = Object.values(data) as string[];

        return dates;
    
    }catch (error){
        return Promise.reject(error);
    }
};
