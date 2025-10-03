"use client"
import { ChevronLeft, ChevronRight, Maximize2, Grid3X3, Heart, X } from 'lucide-react';
import Image from 'next/image';
import React, { useState, useEffect, useCallback } from 'react';

const ImagePreviews = ({ images }: ImagePreviewsProps) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [showGrid, setShowGrid] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    // Navigation handlers
    const handlePrev = useCallback(() => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === 0 ? images.length - 1 : prevIndex - 1
        );
    }, [images.length]);

    const handleNext = useCallback(() => {
        setCurrentImageIndex((prevIndex) => 
            prevIndex === images.length - 1 ? 0 : prevIndex + 1
        );
    }, [images.length]);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'ArrowLeft') handlePrev();
            if (e.key === 'ArrowRight') handleNext();
            if (e.key === 'Escape') {
                setIsFullscreen(false);
                setShowGrid(false);
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [handlePrev, handleNext]);

    const selectImage = (index: number) => {
        setCurrentImageIndex(index);
        setShowGrid(false);
    };

    if (!images || images.length === 0) {
        return (
            <div className="relative h-[450px] w-full bg-gradient-to-br from-slate-50 to-slate-100 rounded-xl border border-slate-200 flex items-center justify-center">
                <div className="text-center text-slate-500">
                    <div className="w-20 h-20 bg-slate-200 rounded-2xl flex items-center justify-center mx-auto mb-6">
                        <Grid3X3 size={32} className="text-slate-400" />
                    </div>
                    <h3 className="text-lg font-semibold mb-2">কোনো ছবি পাওয়া যায়নি</h3>
                    <p className="text-sm opacity-75">No images available for this property</p>
                </div>
            </div>
        );
    }

    return (
        <>
            {/* Main Gallery Container */}
            <div className="relative bg-white rounded-xl overflow-hidden shadow-lg border border-slate-200">
                {/* Primary Image Display */}
                <div className="relative h-[500px] group cursor-pointer" onClick={() => setIsFullscreen(true)}>
                    <Image
                        src={images[currentImageIndex]}
                        alt={`Property image ${currentImageIndex + 1}`}
                        fill
                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                        priority
                    />
                    
                    {/* Gradient Overlay for Better Text Visibility */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {/* Navigation Arrows */}
                    {images.length > 1 && (
                        <>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handlePrev();
                                }}
                                className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                            >
                                <ChevronLeft size={18} className="text-slate-700" />
                            </button>
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleNext();
                                }}
                                className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/90 hover:bg-white shadow-lg rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 hover:scale-110 z-10"
                            >
                                <ChevronRight size={18} className="text-slate-700" />
                            </button>
                        </>
                    )}
                    
                    {/* Top Control Bar */}
                    <div className="absolute top-4 left-4 right-4 flex justify-between items-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                        {/* Image Counter */}
                        <div className="bg-black/60 backdrop-blur-sm text-white px-3 py-1.5 rounded-full text-sm font-medium">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                        
                        {/* Action Controls */}
                        <div className="flex items-center space-x-2">
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsLiked(!isLiked);
                                }}
                                className={`w-10 h-10 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center justify-center ${
                                    isLiked ? 'bg-red-500 text-white' : 'bg-white/90 text-slate-700 hover:bg-white'
                                } shadow-lg hover:scale-110`}
                            >
                                <Heart size={16} className={isLiked ? 'fill-current' : ''} />
                            </button>
                            {images.length > 4 && (
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setShowGrid(true);
                                    }}
                                    className="w-10 h-10 bg-white/90 hover:bg-white text-slate-700 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
                                >
                                    <Grid3X3 size={16} />
                                </button>
                            )}
                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    setIsFullscreen(true);
                                }}
                                className="w-10 h-10 bg-white/90 hover:bg-white text-slate-700 rounded-full backdrop-blur-sm transition-all duration-300 flex items-center justify-center shadow-lg hover:scale-110"
                            >
                                <Maximize2 size={16} />
                            </button>
                        </div>
                    </div>
                    
                    {/* Bottom Progress Indicators */}
                    {images.length > 1 && (
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20">
                            {images.map((_, index) => (
                                <button
                                    key={index}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        setCurrentImageIndex(index);
                                    }}
                                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                                        index === currentImageIndex 
                                            ? 'bg-white scale-125 shadow-lg' 
                                            : 'bg-white/60 hover:bg-white/80'
                                    }`}
                                />
                            ))}
                        </div>
                    )}
                </div>
                
                {/* Thumbnail Gallery */}
                {images.length > 1 && (
                    <div className="p-4 bg-slate-50 border-t border-slate-200">
                        <div className="flex space-x-3 overflow-x-auto scrollbar-hide">
                            {images.slice(0, 6).map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => setCurrentImageIndex(index)}
                                    className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-300 ${
                                        index === currentImageIndex 
                                            ? 'ring-2 ring-blue-500 ring-offset-2 shadow-md scale-105' 
                                            : 'hover:scale-105 hover:shadow-sm'
                                    }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`Thumbnail ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                    {index === currentImageIndex && (
                                        <div className="absolute inset-0 bg-blue-500/20" />
                                    )}
                                </button>
                            ))}
                            {images.length > 6 && (
                                <button
                                    onClick={() => setShowGrid(true)}
                                    className="flex-shrink-0 w-16 h-12 rounded-lg bg-slate-200 hover:bg-slate-300 transition-colors duration-300 flex items-center justify-center text-slate-600 font-medium text-xs"
                                >
                                    +{images.length - 6}
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>

            {/* Grid View Modal */}
            {showGrid && (
                <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-hidden">
                        <div className="flex justify-between items-center p-4 border-b border-slate-200">
                            <h3 className="text-lg font-semibold text-slate-800">All Images ({images.length})</h3>
                            <button
                                onClick={() => setShowGrid(false)}
                                className="w-8 h-8 rounded-full hover:bg-slate-100 flex items-center justify-center transition-colors duration-200"
                            >
                                <X size={16} />
                            </button>
                        </div>
                        <div className="grid grid-cols-3 gap-2 p-4 max-h-[70vh] overflow-y-auto">
                            {images.map((image, index) => (
                                <button
                                    key={index}
                                    onClick={() => selectImage(index)}
                                    className={`relative aspect-square rounded-lg overflow-hidden hover:scale-105 transition-transform duration-200 ${
                                        index === currentImageIndex ? 'ring-2 ring-blue-500' : ''
                                    }`}
                                >
                                    <Image
                                        src={image}
                                        alt={`Gallery image ${index + 1}`}
                                        fill
                                        className="object-cover"
                                    />
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* Fullscreen View */}
            {isFullscreen && (
                <div className="fixed inset-0 bg-black z-50 flex items-center justify-center">
                    <button
                        onClick={() => setIsFullscreen(false)}
                        className="absolute top-6 right-6 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 z-10"
                    >
                        <X size={20} />
                    </button>
                    
                    <div className="relative w-full h-full flex items-center justify-center">
                        <Image
                            src={images[currentImageIndex]}
                            alt={`Fullscreen image ${currentImageIndex + 1}`}
                            fill
                            className="object-contain"
                        />
                        
                        {images.length > 1 && (
                            <>
                                <button
                                    onClick={handlePrev}
                                    className="absolute left-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <ChevronLeft size={20} />
                                </button>
                                <button
                                    onClick={handleNext}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-12 h-12 bg-black/50 hover:bg-black/70 text-white rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                                >
                                    <ChevronRight size={20} />
                                </button>
                            </>
                        )}
                        
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-black/50 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm">
                            {currentImageIndex + 1} / {images.length}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ImagePreviews