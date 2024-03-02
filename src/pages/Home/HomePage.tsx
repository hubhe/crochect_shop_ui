import React from 'react';
import { Link } from 'react-router-dom';

const HomePage: React.FC = () => {
  return (
    <section className="relative">
      <div className="overflow-hidden py-24 sm:py-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 gap-x-8 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
            <div className="lg:pt-12">
              <div className="lg:max-w-xl">
                <h1 className="text-center text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-left">
                  Welcome to the World of{' '}
                  <span className="block text-violet-500 lg:inline">
                    Adi Crochets
                  </span>
                </h1>
                <p className="mt-6 text-center text-lg leading-8 text-gray-600 lg:text-left">
                  <span className="inline font-semibold text-gray-900">
                    Adi Crochets
                  </span>{' '}
                  is cute crocheted handmade plushies you can adopt and love!
                </p>
                <div className="mt-10 flex flex-wrap items-center justify-center gap-y-4 gap-x-6 sm:flex-nowrap sm:gap-y-4 lg:justify-start">
                  <Link to="/store">
                    Shop plushies
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomePage;