"use client"
import { NAVBAR_HEIGHT } from '@/lib/constants';
import { useAppDispatch, useAppSelector } from '@/state/redux';
import { useSearchParams } from 'next/navigation'
import React, { useEffect } from 'react'
import { setFilters } from '@/state';
import FiltersBar from './FiltersBar';
import FiltersFull from './FiltersFull';
import Listings from './Listings';
import Map from './Map';

const SearchPageComponent: React.FC = () => {
    const searchParams = useSearchParams();
    const dispatch = useAppDispatch();
    const isFiltersFullOpen = useAppSelector(
        (state)=> state.global.isFiltersFullOpen
    )

    // Parse URL parameters and initialize filters
    useEffect(() => {
        const location = searchParams.get('location') || 'any';
        const coordinatesParam = searchParams.get('coordinates');
        const radius = searchParams.get('radius');

        // Parse bounds from URL
        const boundsNorth = searchParams.get('boundsNorth');
        const boundsSouth = searchParams.get('boundsSouth');
        const boundsEast = searchParams.get('boundsEast');
        const boundsWest = searchParams.get('boundsWest');

        const bounds = boundsNorth && boundsSouth && boundsEast && boundsWest ? {
            north: Number(boundsNorth),
            south: Number(boundsSouth),
            east: Number(boundsEast),
            west: Number(boundsWest),
        } : null;

        // Safely parse availableFrom date
        let availableFromParam = searchParams.get('availableFrom') || 'any';
        if (availableFromParam && availableFromParam !== 'any') {
            try {
                const testDate = new Date(availableFromParam);
                if (isNaN(testDate.getTime())) {
                    console.warn(`Invalid availableFrom URL parameter: ${availableFromParam}, defaulting to 'any'`);
                    availableFromParam = 'any';
                }
            } catch {
                console.warn(`Error parsing availableFrom URL parameter: ${availableFromParam}, defaulting to 'any'`);
                availableFromParam = 'any';
            }
        }

        const urlFilters = {
            location,
            beds: searchParams.get('beds') || 'any',
            baths: searchParams.get('baths') || 'any',
            propertyType: searchParams.get('propertyType') || 'any',
            amenities: searchParams.get('amenities')?.split(',') || [],
            availableFrom: availableFromParam,
            priceRange: (searchParams.get('priceRange')?.split(',').map(p => p ? Number(p) : null) || [null, null]) as [number, number] | [null, null],
            squareFeet: [
                searchParams.has('squareFeetMin') ? Number(searchParams.get('squareFeetMin')) : null,
                searchParams.has('squareFeetMax') ? Number(searchParams.get('squareFeetMax')) : null
            ] as [number, number] | [null, null],
            coordinates: coordinatesParam ? (coordinatesParam.split(',').map(Number) as [number, number]) : null,
            radius: radius ? Number(radius) : 5,
            bounds,
        };

        console.log('Parsed URL filters:', urlFilters);
        dispatch(setFilters(urlFilters));
    }, [searchParams, dispatch]);
    return <div className="w-full mx-auto px-5 flex flex-col" style={{
  height: `calc(100vh - ${NAVBAR_HEIGHT}px)`, // Added space before ${NAVBAR_HEIGHT}
  marginTop: `${NAVBAR_HEIGHT}px`,
}}
  >
    <FiltersBar/>
     <div className="flex justify-between flex-1 overflow-hidden gap-3 mb-5">
        <div className={`h-full overflow-auto transition-all duration-300 ease-in-out ${
            isFiltersFullOpen ? "w-3/12 opacity-100 visible" : "w-0 opacity-0 invisible"
        }`}>
           <FiltersFull/>
        </div>
        <div className="flex-1 flex flex-col min-w-0">
            <Map />
        </div>
        <div className="basis-4/12 overflow-y-auto"><Listings /></div>
     </div>

    </div>;
  
};

const SearchPage = React.memo(SearchPageComponent);
SearchPage.displayName = 'SearchPage';

export default SearchPage;