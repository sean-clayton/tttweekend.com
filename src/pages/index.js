import React, { useState } from "react";
import { useStaticQuery, graphql } from "gatsby";
import "twin.macro";
import isWeekend from "date-fns/isWeekend";
import formatDistance from "date-fns/formatDistance";

function nextWeekdayDate(date, dayInWeek) {
  var ret = new Date(date || new Date());
  ret.setDate(ret.getDate() + ((dayInWeek - 1 - ret.getDay() + 7) % 7) + 1);
  return ret;
}

function NotPlaying({ discord }) {
  const nextPlayTime = nextWeekdayDate(new Date(), 6).setUTCHours(14, 30);
  const distance = formatDistance(nextPlayTime, new Date());

  return (
    <>
      <h2 tw="text-center text-3xl text-yellow-50 font-extrabold">
        Join us on the Weekend!
      </h2>
      <p tw="text-center text-yellow-50">
        We'll be playing in about {distance}!
      </p>
      <div tw="text-center mt-4">
        <a
          href="steam://connect/play.tttweekends.com"
          tw="shadow-sm rounded-md inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 rounded-md text-indigo-50 bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-800 transition duration-150 ease-in-out"
        >
          Join the fun!
        </a>
      </div>
    </>
  );
}

function Playing() {
  return (
    <>
      <h2 tw="text-center text-3xl text-yellow-50 font-extrabold">
        It's the weekend!
      </h2>
      <p tw="text-center text-yellow-50">Time for some TTT!</p>
      <div tw="text-center mt-4">
        <a
          href="steam://connect/play.tttweekends.com"
          tw="shadow-sm rounded-md inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 rounded-md text-indigo-50 bg-indigo-700 hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-800 transition duration-150 ease-in-out"
        >
          Join the fun!
        </a>
      </div>
    </>
  );
}

export default function Home() {
  const weekend = isWeekend(new Date());

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          discord
          workshop
          rules {
            name
            description
          }
        }
      }
    }
  `);

  const metadata = data.site.siteMetadata;
  const halfwayThrough = Math.ceil(metadata.rules.length / 2);
  const arrayFirstHalf = metadata.rules.slice(0, halfwayThrough);
  const arraySecondHalf = metadata.rules.slice(
    halfwayThrough,
    metadata.rules.length
  );

  return (
    <main tw="min-h-screen bg-indigo-900">
      <section tw="bg-gray-900 relative">
        <main tw="lg:relative">
          <div tw="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
            <div tw="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
              <h2 tw="text-4xl tracking-tight leading-10 font-extrabold text-indigo-50 sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl">
                Play TTT <em>every weekend</em>
              </h2>
              <p tw="mt-3 max-w-md mx-auto text-lg text-gray-50 sm:text-xl md:mt-5 md:max-w-3xl">
                Consistent Trouble in Terrorist Town gaming sessions{" "}
                <em>every weekend</em>. Easy to set up and easy to play!
              </p>
              <div tw="mt-10 sm:flex sm:justify-center lg:justify-start">
                <div tw="rounded-md shadow">
                  <a
                    href={metadata.discord}
                    tw="shadow w-full flex items-center justify-center px-8 py-3 border border-transparent text-base leading-6 font-medium rounded-md text-white bg-indigo-500 hover:shadow-lg focus:outline-none focus:border-indigo-700 focus:shadow-outline-indigo transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                  >
                    Join us on Discord
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div tw="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
            <img
              tw="opacity-50 absolute inset-0 w-full h-full object-cover"
              src="/ttt-1.jpg"
              alt="Woman on her phone"
            />
          </div>
        </main>
      </section>

      <section tw="py-16 bg-yellow-400">
        {weekend ? <Playing /> : <NotPlaying discord={metadata.discord} />}
      </section>

      <section>
        <div tw="max-w-screen-xl mx-auto pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
          <h2 tw="text-3xl leading-9 font-extrabold text-gray-50 text-center">
            Some Ground Rules
          </h2>
          <div tw="mt-6 border-t-2 border-indigo-300 pt-10">
            <dl tw="md:grid md:grid-cols-2 md:gap-8">
              <div tw="md:mb-0">
                {arrayFirstHalf.map(rule => (
                  <div key={rule.name} tw="mb-12">
                    <dt tw="text-lg leading-6 font-medium text-gray-50">
                      {rule.name}
                    </dt>
                    <dd tw="mt-2">
                      <p tw="text-base leading-6 text-indigo-200">
                        {rule.description}
                      </p>
                    </dd>
                  </div>
                ))}
              </div>
              <div tw="mt-12 md:mt-0">
                {arraySecondHalf.map(rule => (
                  <div key={rule.name} tw="mb-12">
                    <dt tw="text-lg leading-6 font-medium text-gray-50">
                      {rule.name}
                    </dt>
                    <dd tw="mt-2">
                      <p tw="text-base leading-6 text-indigo-200">
                        {rule.description}
                      </p>
                    </dd>
                  </div>
                ))}
              </div>
            </dl>
          </div>
        </div>
      </section>
    </main>
  );
}
