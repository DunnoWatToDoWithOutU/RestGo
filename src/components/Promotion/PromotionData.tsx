import React, { useState, useEffect } from 'react';
import ProButton from './ProButton';
import { PromotionProps } from '../../../@types/type';
import getPromotions from '@/libs/getPromotions';

export default function PromotionData() {
    const [promotions, setPromotions] = useState<PromotionProps[]>([]);
    useEffect(() => {
        const fetchData = async () => {
            try {
                const promotionData: PromotionProps[] = await getPromotions();
                setPromotions(promotionData);
            } catch (error) {
                console.error('Error fetching promotions:', error);
            }
        };
        fetchData();
    }, []);
    return <ProButton promotion={promotions}></ProButton>;
}
