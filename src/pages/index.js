import React, { useState, useEffect, useRef } from "react";
import { Helmet } from "react-helmet";
import { useStaticQuery, graphql } from "gatsby";
import "twin.macro";
import isWeekend from "date-fns/isWeekend";
import differenceInHours from "date-fns/differenceInHours";
import { intervalToDuration, formatDuration } from "date-fns";

const pattern1Url = `url("data:image/svg+xml,%3Csvg width='100' height='20' viewBox='0 0 100 20' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M21.184 20c.357-.13.72-.264 1.088-.402l1.768-.661C33.64 15.347 39.647 14 50 14c10.271 0 15.362 1.222 24.629 4.928.955.383 1.869.74 2.75 1.072h6.225c-2.51-.73-5.139-1.691-8.233-2.928C65.888 13.278 60.562 12 50 12c-10.626 0-16.855 1.397-26.66 5.063l-1.767.662c-2.475.923-4.66 1.674-6.724 2.275h6.335zm0-20C13.258 2.892 8.077 4 0 4V2c5.744 0 9.951-.574 14.85-2h6.334zM77.38 0C85.239 2.966 90.502 4 100 4V2c-6.842 0-11.386-.542-16.396-2h-6.225zM0 14c8.44 0 13.718-1.21 22.272-4.402l1.768-.661C33.64 5.347 39.647 4 50 4c10.271 0 15.362 1.222 24.629 4.928C84.112 12.722 89.438 14 100 14v-2c-10.271 0-15.362-1.222-24.629-4.928C65.888 3.278 60.562 2 50 2 39.374 2 33.145 3.397 23.34 7.063l-1.767.662C13.223 10.84 8.163 12 0 12v2z' fill='white' fill-opacity='0.1' fill-rule='evenodd'/%3E%3C/svg%3E")`;

const pattern2Url = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='32' viewBox='0 0 16 32'%3E%3Cg fill='black' fill-opacity='0.1'%3E%3Cpath fill-rule='evenodd' d='M0 24h4v2H0v-2zm0 4h6v2H0v-2zm0-8h2v2H0v-2zM0 0h4v2H0V0zm0 4h2v2H0V4zm16 20h-6v2h6v-2zm0 4H8v2h8v-2zm0-8h-4v2h4v-2zm0-20h-6v2h6V0zm0 4h-4v2h4V4zm-2 12h2v2h-2v-2zm0-8h2v2h-2V8zM2 8h10v2H2V8zm0 8h10v2H2v-2zm-2-4h14v2H0v-2zm4-8h6v2H4V4zm0 16h6v2H4v-2zM6 0h2v2H6V0zm0 24h2v2H6v-2z'/%3E%3C/g%3E%3C/svg%3E")`;

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

function Playing({ gmod }) {
  return (
    <CTA
      heading="It's the weekend!"
      description="Let's play some TTT!"
      target={gmod}
    />
  );
}

export default function Home() {
  const weekend = useRef(
    isWeekend(new Date()) || differenceInHours(nextPlayTime, new Date()) <= 1
  );

  const data = useStaticQuery(graphql`
    query {
      site {
        siteMetadata {
          title
          discord
          workshop
          gmod
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
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/favicon-16x16.png"
        />
        <link rel="manifest" href="/site.webmanifest" />
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#5bbad5" />
        <meta name="apple-mobile-web-app-title" content="TTT Weekends" />
        <meta name="application-name" content="TTT Weekends" />
        <meta name="theme-color" content="#3f83f8" />

        <title>TTT Weekends</title>
      </Helmet>

      <main tw="font-inter min-h-screen bg-gray-900">
        <section tw="relative">
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

        <section
          tw="py-24 bg-blue-500 shadow-xl border-t border-solid border-blue-400"
          style={{ backgroundImage: pattern1Url }}
        >
          {weekend.current ? (
            <Playing gmod={metadata.gmod} />
          ) : (
            <NotPlaying discord={metadata.discord} />
          )}
        </section>

        <section tw="bg-yellow-50 shadow-xl">
          <div tw="max-w-screen-xl mx-auto pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
            <h2
              tw="text-3xl leading-9 font-extrabold text-yellow-900 text-center"
              style={{ textShadow: "0 1px 0 rgb(255 255 255 / 50%)" }}
            >
              Quick &amp; easy setup
            </h2>
            <div tw="prose md:text-lg mt-4 text-gray-900">
              <ol>
                <li>
                  Install <a href="#">Garry's Mod</a>
                </li>
                <li>
                  Install <a href="">Counter-Strike: Source</a>. If you already
                  own it, just install it from your Steam library. Otherwise,
                  you can install it by following the instructions on{" "}
                  <a href="https://gmodcontent.com/">gmodcontent.com</a>
                </li>
                <li>
                  <mark
                    tw="bg-yellow-200"
                    style={{ textShadow: "0 1px 0 rgb(255 255 255 / 50%)" }}
                  >
                    <strong>
                      Subscribe to{" "}
                      <a href={metadata.workshop}>
                        our Steam Workshop collection
                      </a>
                    </strong>
                  </mark>
                </li>
                <li>
                  <a href={metadata.discord}>Join our Discord!</a>
                </li>
                <li>Have fun!</li>
              </ol>
            </div>
          </div>
        </section>

        <section tw="bg-red-800" style={{ backgroundImage: pattern2Url }}>
          <div tw="max-w-screen-xl mx-auto pt-12 pb-16 sm:pt-16 sm:pb-20 px-4 sm:px-6 lg:pt-20 lg:pb-28 lg:px-8">
            <h2
              tw="text-3xl leading-9 font-extrabold text-gray-50 text-center"
              style={{ textShadow: "0 1px 0 rgb(0 0 0 / 50%)" }}
            >
              Some Ground Rules
            </h2>
            <div tw="mt-6 border-t-2 border-red-300 pt-10">
              <dl tw="md:grid md:grid-cols-2 md:gap-8">
                <div tw="md:mb-0">
                  {arrayFirstHalf.map(rule => (
                    <div key={rule.name} tw="mb-12">
                      <dt tw="text-lg leading-6 font-bold text-gray-50">
                        {rule.name}
                      </dt>
                      <dd tw="mt-2">
                        <p tw="text-base leading-6 text-red-200">
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
                        <p tw="text-base leading-6 text-red-200">
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

        <footer tw="p-8">
          <div tw="mx-auto prose text-center text-blue-200">
            Site created by{" "}
            <a tw="text-yellow-200!" href="https://keybase.io/seanclayton">
              S. P. O. Clayton
            </a>
            <br />
            <a
              tw="text-yellow-200!"
              href="https://github.com/sean-clayton/tttweekend.com"
            >
              Site source.
            </a>{" "}
            Licensed under the{" "}
            <a
              tw="text-yellow-200!"
              href="https://opensource.org/licenses/0BSD"
            >
              BSD Zero Clause license.
            </a>
          </div>
        </footer>
      </main>
    </>
  );
}
