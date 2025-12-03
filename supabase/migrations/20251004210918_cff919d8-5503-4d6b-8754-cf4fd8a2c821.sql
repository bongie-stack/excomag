-- Insert sample articles
-- Note: Using the first admin user's ID for the articles
INSERT INTO public.articles (user_id, title, excerpt, content, author, category, read_time)
SELECT 
  p.user_id,
  'The Future of African Entrepreneurship: Digital Innovation Leading the Way',
  'Exploring how digital transformation is reshaping business landscapes across Africa, from fintech to agritech solutions.',
  'The African continent stands at the precipice of a digital revolution that promises to transform its entrepreneurial landscape forever. From the bustling tech hubs of Lagos and Nairobi to the emerging startup ecosystems in Accra and Cape Town, a new generation of African entrepreneurs is leveraging technology to solve local problems with global impact.

The rise of mobile money platforms like M-Pesa in Kenya has demonstrated Africa''s capacity to leapfrog traditional financial infrastructure. This innovation has not only revolutionized how Africans handle money but has also inspired similar solutions across the continent and beyond.

In the agricultural sector, startups are using IoT sensors, satellite imagery, and AI to help smallholder farmers optimize their yields and connect to markets. Companies like Twiga Foods in Kenya and Gro Intelligence across multiple African countries are proving that technology can address food security challenges while creating sustainable businesses.

The e-commerce space has also seen remarkable growth, with platforms like Jumia and Konga demonstrating that African consumers are ready to embrace online shopping. These platforms have had to innovate around unique African challenges, such as limited formal addresses and cash-based payment preferences.

Looking ahead, the future of African entrepreneurship will be defined by solutions that are inherently African but globally relevant. The continent''s young, digitally-native population is uniquely positioned to drive this innovation forward.',
  'Dr. Amara Okafor',
  'Technology',
  '8 min read'
FROM public.profiles p
WHERE p.role = 'admin'
LIMIT 1;

INSERT INTO public.articles (user_id, title, excerpt, content, author, category, read_time)
SELECT 
  p.user_id,
  'Building Sustainable Supply Chains: Lessons from African SMEs',
  'How small and medium enterprises across Africa are creating resilient supply chains that can weather global disruptions.',
  'Small and medium enterprises (SMEs) across Africa have long been masters of resilience, operating in environments where supply chain disruptions are not exceptional events but part of the business landscape. The COVID-19 pandemic and recent global supply chain challenges have highlighted the wisdom embedded in African SME practices.

One key lesson is the importance of local sourcing and building strong community networks. Many successful African SMEs prioritize relationships with local suppliers, creating supply chains that are not only more resilient but also contribute to local economic development.

The concept of "Ubuntu" - the African philosophy of interconnectedness - manifests beautifully in business contexts where companies see their suppliers as partners rather than mere vendors. This approach has enabled many African businesses to maintain operations even during global disruptions.

Technology is playing an increasingly important role in modernizing these traditional approaches. Digital platforms are helping SMEs find alternative suppliers, track inventory more effectively, and predict potential disruptions before they occur.

African SMEs are also pioneering circular economy approaches, finding innovative ways to reuse materials and minimize waste. These practices not only reduce costs but also create new business opportunities while protecting the environment.

The lessons from African SMEs about flexibility, community engagement, and local focus are increasingly relevant for businesses worldwide as they seek to build more sustainable and resilient operations.',
  'Samuel Mensah',
  'Business',
  '6 min read'
FROM public.profiles p
WHERE p.role = 'admin'
LIMIT 1;