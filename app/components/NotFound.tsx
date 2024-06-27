import {Button} from './Button';
import {FeaturedSection} from './FeaturedSection';
import {PageHeader, Text} from './Text';

export function NotFound({type = 'page'}: {type?: string}) {
  const heading = `We’ve lost this ${type}`;
  const description = `We couldn’t find the ${type} you’re looking for. Try checking the URL or heading back to the home page.`;

  return (
    <>
      <PageHeader heading={heading} className="pt-[50px] lg:pt-[200px] px-6 lg:px-24 bg-[#ffffff]">
        <Text as="p">
          {description}
        </Text>
        <Button width="auto" variant="secondary" to={'/'}>
          Take me to the home page
        </Button>
      </PageHeader>
      <div className="lg:px-16 bg-[#ffffff]">
        <FeaturedSection />
      </div>
    </>
  );
}
