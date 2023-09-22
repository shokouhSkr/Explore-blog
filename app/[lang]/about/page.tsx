import { Container } from "@/components";
import Image from "next/image";
import about from "../../../public/images/about.jpg";
import { getDictionary } from "@/helpers/utils";

export default async function AboutPage({ params }: { params: { lang: string } }) {
  const dictionary = await getDictionary(params.lang);

  return (
    <Container locale={params.lang}>
      <div className="lg:grid-cols-2 lg:gap-x-8 lg:items-center grid grid-cols-1">
        <Image
          src={about}
          alt="shokouh skr"
          width={600}
          height={600}
          className="rounded-md mx-auto lg:mb-0 mb-8 grayscale object-cover object-center"
        />

        <div>
          <h1 className="text-3xl md:text-4xl font-semibold mb-8 text-neutral-800 dark:text-neutral-100">
            {dictionary.about.title}
          </h1>
          <div className="space-y-4 md:text-xl text-neutral-800 dark:text-neutral-100">
            <p>{dictionary.about.text1}</p>
            <p>{dictionary.about.text2}</p>
            <p>{dictionary.about.text3}</p>
          </div>
        </div>
      </div>
    </Container>
  );
}
