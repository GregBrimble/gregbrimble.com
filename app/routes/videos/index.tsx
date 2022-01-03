import { Link, LoaderFunction, MetaFunction, useLoaderData } from "remix";
import { VideoGallery, WithContext } from "schema-dts";
import { ExternalLink } from "~/components/ExternalLink";
import { GregBrimble } from "~/content/schema.org/GregBrimble";
import { Video } from "~/data/videos";
import { Context } from "~/types";
import { formatDate, formatDuration } from "~/utils/formatDate";
import { generateMeta } from "~/utils/generateMeta";

interface LoaderData {
  nextLive?: { title?: string; start: string; end: string };
  videos: Video[];
}

export const loader: LoaderFunction = async ({
  context,
}: {
  context: Context;
}) => {
  const data: LoaderData = {
    videos: (await context.clients.videos.getVideos()) || [],
  };

  const schedule = await context.clients.videos.getSchedule();
  if (schedule && schedule.length > 0) {
    data.nextLive = schedule[0];
  }

  return data;
};

export const meta: MetaFunction = () => {
  return generateMeta({
    title: "Videos",
    description:
      "A collection of videos by Greg Brimble, primarily about technology.",
    path: "/videos",
  });
};

export default function Videos() {
  const { videos } = useLoaderData<LoaderData>();

  const jsonLD: WithContext<VideoGallery> = {
    "@context": "https://schema.org",
    "@type": "VideoGallery",
    breadcrumb: {
      "@type": "BreadcrumbList",
      // TODO
    },
    author: { "@id": GregBrimble["@id"] },
  };

  return (
    <>
      <div className="pt-16 pb-20 px-4 sm:px-6 lg:pt-24 lg:pb-28 lg:px-8">
        <div className="relative max-w-lg mx-auto divide-y-2 divide-gray-200 dark:divide-gray-700 lg:max-w-7xl">
          <div>
            <h2 className="text-3xl tracking-tight font-extrabold text-gray-900 dark:text-white sm:text-4xl">
              Videos
            </h2>
            <div className="mt-3 sm:mt-4 lg:grid lg:grid-cols-2 lg:gap-5 lg:items-center">
              <p className="text-xl text-gray-500 dark:text-gray-400">
                A collection of videos primarily about technology.
              </p>
              <form
                className="mt-6 lg:mt-0"
                action="https://newsletter.gregbrimble.com/add_subscriber"
                method="post"
                name="revue-form"
                target="_blank"
              >
                <div className="flex flex-col sm:flex-row lg:justify-end">
                  <div className="flex-1 lg:flex-initial">
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="member[email]"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none w-full px-4 py-2 border border-gray-300 dark:border-gray-600 text-base rounded-md text-gray-900 dark:text-white bg-white dark:bg-gray-900 placeholder-gray-500 dark:placeholder-gray-400 focus:outline-none focus:ring-blue-500 dark:focus:ring-blue-400 focus:border-blue-500 dark:focus:border-blue-400 lg:max-w-xs"
                      placeholder="Enter your email"
                    />
                  </div>
                  <div className="mt-2 flex-shrink-0 w-full flex rounded-md shadow-sm sm:mt-0 sm:ml-3 sm:w-auto sm:inline-flex">
                    <input
                      type="submit"
                      value="Notify me"
                      name="member[subscribe]"
                      className="w-full bg-blue-600 dark:bg-blue-300 px-4 py-2 border border-transparent rounded-md flex items-center justify-center text-base font-medium text-white dark:text-gray-900 hover:bg-blue-700 dark:hover:bg-blue-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 dark:focus:ring-blue-400 sm:w-auto sm:inline-flex cursor-pointer"
                    />
                  </div>
                </div>
                <div className="mt-4 sm:mt-2 text-sm text-gray-500 dark:text-gray-400 lg:text-right">
                  By subscribing, you agree with Revue&apos;s{" "}
                  <ExternalLink
                    href="https://www.getrevue.co/terms"
                    className="underline"
                  >
                    Terms of Service
                  </ExternalLink>{" "}
                  and{" "}
                  <ExternalLink
                    href="https://www.getrevue.co/privacy"
                    className="underline"
                  >
                    Privacy Policy
                  </ExternalLink>
                  .
                </div>
              </form>
            </div>
          </div>
          <div className="mt-6 pt-10 grid gap-16 lg:grid-cols-2 lg:gap-x-5 lg:gap-y-12">
            {videos.map((video) => (
              <Link
                to={`/videos/${video.slug}`}
                key={video.title}
                className="group"
              >
                <div className="aspect-w-3 aspect-h-2">
                  <img
                    className="object-cover shadow-lg rounded-lg"
                    src={video.image.url}
                    alt={`Video thumbnail for ${video.title}`}
                  />
                </div>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                  <time dateTime={video.uploadedDate}>
                    {formatDate(video.uploadedDate)}
                  </time>
                </p>
                <div className="mt-2 block">
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {video.title}
                  </p>
                  <p className="mt-3 text-base text-gray-500 dark:text-gray-400">
                    {formatDuration(video.duration)}
                  </p>
                </div>
                <div className="mt-3">
                  <p className="text-base font-semibold text-blue-600 dark:text-blue-300 group-hover:text-blue-500 dark:group-hover:text-blue-400">
                    Watch the full video
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLD) }}
      />
    </>
  );
}
