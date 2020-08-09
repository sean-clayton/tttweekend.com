import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import "twin.macro";
import isWeekend from "date-fns/isWeekend";
import differenceInHours from "date-fns/differenceInHours";
import { intervalToDuration, formatDuration } from "date-fns";

function ExternalLinkIcon(props) {
  return (
    <svg
      tw="ml-1 h-5 w-5"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      {...props}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
      />
    </svg>
  );
}

function nextWeekdayDate(date, dayInWeek) {
  var ret = new Date(date || new Date());
  ret.setDate(ret.getDate() + ((dayInWeek - 1 - ret.getDay() + 7) % 7) + 1);
  return ret;
}

const nextPlayTime = new Date(
  nextWeekdayDate(new Date(), 6).setUTCHours(16, 30, 0, 0)
);

function getDuration() {
  const duration = formatDuration(
    intervalToDuration({
      end: new Date(),
      start: nextPlayTime,
    })
  );

  return duration;
}

function useInterval(callback, delay) {
  const intervalId = useRef(null);
  const savedCallback = useRef(callback);
  useEffect(() => {
    savedCallback.current = callback;
  });
  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };
    if (typeof delay === "number") {
      intervalId.current = window.setInterval(tick, delay);
      return () => window.clearInterval(intervalId.current);
    }
  }, [delay]);
  return intervalId.current;
}

function CTA({ heading, description, target }) {
  return (
    <>
      <h2
        tw="text-center text-3xl md:text-5xl text-yellow-50 font-extrabold"
        style={{ textShadow: "0 1px 0 rgb(0 0 0 / 50%)" }}
      >
        {heading}
      </h2>
      <p tw="text-center text-yellow-50">{description}</p>
      <div tw="text-center mt-4">
        <a
          href={target}
          tw="font-medium border-t border-solid border-yellow-200 shadow rounded-md inline-flex text-lg items-center px-6 py-3 leading-5 rounded-md text-yellow-900 bg-yellow-300 hover:bg-yellow-200 focus:outline-none hover:shadow-lg focus:shadow-outline-yellow active:bg-yellow-800 transition duration-150 ease-in-out"
          style={{ textShadow: "0 1px 0 rgb(255 255 255 / 50%)" }}
        >
          Join the fun! <ExternalLinkIcon />
        </a>
      </div>
    </>
  );
}

function NotPlaying({ discord }) {
  const [duration, setDuration] = useState(getDuration());

  const updateDuration = newVal => {
    setDuration(newVal);
  };

  useInterval(() => {
    updateDuration(getDuration());
  }, 1000);

  return (
    <CTA
      heading="Join us on the weekend!"
      description={`We'll be playing in ${duration}`}
      target={discord}
    />
  );
}

function Playing() {
  return (
    <CTA
      heading="It's the weekend!"
      description="Let's play some TTT!"
      target="steam://connect/play.tttweekends.com"
    />
  );
}

export default function Home() {
  const weekend =
    isWeekend(new Date()) || differenceInHours(nextPlayTime, new Date()) <= 1;

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
    <>
      <Helmet>
        <meta
          name="keywords"
          content="TTT, Trouble in Terrorist Town, Garry's Mod, Gmod"
        />
        <meta
          name="description"
          content="Consistent Trouble in Terrorist Town gaming sessions every weekend."
        />
        <title>TTT Weekends</title>
      </Helmet>
      <main tw="font-inter min-h-screen bg-blue-900">
        <section tw="bg-gray-900 relative">
          <main tw="lg:relative">
            <div tw="mx-auto max-w-7xl w-full pt-16 pb-20 text-center lg:py-48 lg:text-left">
              <div tw="px-4 lg:w-1/2 sm:px-8 xl:pr-16">
                <h2
                  tw="text-4xl tracking-tight leading-10 font-extrabold text-blue-50 sm:text-5xl sm:leading-none md:text-6xl lg:text-5xl xl:text-6xl"
                  style={{ textShadow: "0 1px 0 rgb(0 0 0 / 50%)" }}
                >
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
                      tw="border-t border-solid border-blue-400 shadow w-full flex items-center justify-center px-8 py-3 text-base leading-6 font-medium rounded-md text-white bg-blue-500 hover:bg-blue-400 hover:shadow-lg focus:outline-none focus:border-blue-700 focus:shadow-outline-blue transition duration-150 ease-in-out md:py-4 md:text-lg md:px-10"
                      style={{ textShadow: "0 1px 0 rgb(0 0 0 / 50%)" }}
                    >
                      Join us on Discord <ExternalLinkIcon />
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div tw="relative w-full h-64 sm:h-72 md:h-96 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2 lg:h-full">
              <img
                tw="absolute inset-0 w-full h-full object-cover"
                style={{
                  filter: "grayscale(1) brightness(1.25)",
                  mixBlendMode: "soft-light",
                }}
                src="/ttt-1.jpg"
                alt="Screenshot of Trouble in Terrorist Town"
              />
            </div>
          </main>
        </section>

        <section tw="py-24 bg-blue-500 shadow-xl border-t border-solid border-blue-400">
          {weekend ? <Playing /> : <NotPlaying discord={metadata.discord} />}
        </section>

        <section>
          <div tw="max-w-screen-xl mx-auto pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
            <h2
              tw="text-3xl leading-9 font-extrabold text-gray-50 text-center"
              style={{ textShadow: "0 1px 0 rgb(0 0 0 / 50%)" }}
            >
              Some Ground Rules
            </h2>
            <div tw="mt-6 border-t-2 border-blue-300 pt-10">
              <dl tw="md:grid md:grid-cols-2 md:gap-8">
                <div tw="md:mb-0">
                  {arrayFirstHalf.map(rule => (
                    <div key={rule.name} tw="mb-12">
                      <dt tw="text-lg leading-6 font-bold text-gray-50">
                        {rule.name}
                      </dt>
                      <dd tw="mt-2">
                        <p tw="text-base leading-6 text-blue-200">
                          {rule.description}
                        </p>
                      </dd>
                    </div>
                  ))}
                </div>
                <div tw="mt-12 md:mt-0">
                  {arraySecondHalf.map(rule => (
                    <div key={rule.name} tw="mb-12">
                      <dt tw="text-lg leading-6 font-bold text-gray-50">
                        {rule.name}
                      </dt>
                      <dd tw="mt-2">
                        <p tw="text-base leading-6 text-blue-200">
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
    </>
  );
}
