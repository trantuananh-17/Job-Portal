import { Building, Clock, Globe, Locate, MapPin, User, Users } from 'lucide-react';
import JobTitle from './components/JobTitle';
import SkillItem from './components/ui/SkillItem';
import CompanyItem from './components/ui/CompanyItem';
import JobItem from './components/JobItem';

const text =
  "<p>HRS, a pioneer in business travel, aims to elevate every stay through innovative technology. With over 50 years of experience, their digital platform, driven by ProcureTech, TravelTech, and FinTech, transforms how companies and travelers Stay, Work, and Pay.&nbsp;</p><p>ProcureTech digitally revolutionizes lodging procurement, connecting corporations and suppliers in a cutting-edge ecosystem. This enables seamless efficiency and automation, surpassing travelers' expectations.&nbsp;</p><p>TravelTech redefines the online lodging experience, offering personalized content from selection to check-in, ensuring an unparalleled journey for corporate travelers.&nbsp;</p><p>In FinTech, HRS introduces advancements like mobile banking and digital payments, turning corporate back offices into touchless lodging enablers, eliminating legacy cost barriers. The innovative 2-click book-to-pay feature streamlines interactions for travelers and hoteliers.&nbsp;</p><p>Combining these technology propositions, HRS unlocks exponential catalyst effects. Their data-driven focus delivers value-added services and high-return network effects, creating substantial customer value.&nbsp;</p><p>HRS's exponential growth since 1972 serves over 35% of the global Fortune 500 and leading hotel chains.&nbsp;</p><p>Join HRS to shape the future of business travel, empowered by a culture of growth and setting new industry standards worldwide.</p><p></p><p><strong>Key Responsibilities</strong></p><p></p><ul><li><p>abc123</p></li><li><p>abc123</p></li><li><p>acb1234</p></li><li><p>acb12</p></li></ul><p></p><p><strong>Professional Skills</strong><br></p><ul><li><p>abc123</p></li><li><p>abc123</p></li></ul><p></p>";

const benefits = [
  'Mức lương cạnh tranh, thưởng theo hiệu quả công việc',
  'Chế độ bảo hiểm đầy đủ theo quy định',
  'Nghỉ phép năm và ngày nghỉ lễ theo luật lao động',
  'Đào tạo và cơ hội phát triển nghề nghiệp',
  'Môi trường làm việc năng động, chuyên nghiệp',
  'Teambuilding, du lịch hàng năm',
  'Chế độ chăm sóc sức khỏe định kỳ',
  'Hỗ trợ ăn trưa, gửi xe hoặc phụ cấp khác'
];

const skills = ['Docker', 'HTML5', 'CSS3', 'Javascript', 'Typescript'];

const user = {
  quantity: 200
};

const JobDetail = () => {
  return (
    <>
      <section className='bg-black pt-[140px] pb-20'>
        <h1 className='text-center text-[60px] font-semibold text-white'>Job Details</h1>
      </section>

      <div className='container'>
        <section className='flex flex-1 flex-col gap-5'>
          <JobTitle />
          <div className='flex items-start gap-6'>
            <div className='description flex-3'>
              <h2 className='text-2xl font-semibold'>Job Description</h2>
              <div
                className='text-xl [&>ol]:ml-10 [&>ol]:list-decimal [&>ul]:ml-10 [&>ul]:list-disc'
                dangerouslySetInnerHTML={{ __html: text }}
              />
              <h2 className='mt-6 text-2xl font-semibold'>Job Benefits</h2>
              <ul className='ml-10 list-disc text-xl'>
                {benefits.map((item, idx) => (
                  <li key={idx}>{item}</li>
                ))}
              </ul>

              <div className='mt-6 flex flex-col gap-5'>
                <h2 className='mt-6 text-2xl font-semibold'>Job Skills</h2>
                <div className='flex gap-6'>
                  {skills.map((item) => (
                    <SkillItem name={item} />
                  ))}
                </div>
              </div>
            </div>

            <div className='bg-secondary flex flex-1 flex-col gap-8 rounded-[20px] p-7'>
              <h2 className='mt-2 text-[18px] font-bold'>Company Overview</h2>

              <div className='flex flex-col gap-7'>
                {/* <div className='flex gap-5'>
                  <Building className='text-primary' />
                  <div className='flex flex-col gap-3'>
                    <p className='font-semibold'>Company Name </p>
                    <p className='leading-5 text-gray-500'>ONE Tech Stop Vietnam Company Ltd</p>
                  </div>
                </div> */}
                <CompanyItem icon={Building} title='Company Name' content='ONE Tech Stop Vietnam Company Ltd' />
                <CompanyItem icon={Users} title='Company Size' content={user.quantity + ' employees'} />
                <CompanyItem icon={Globe} title='Company Industry' content='IT Services and IT Consulting' />
                <CompanyItem icon={Clock} title='Date of establishment' content='20-10-2000' />
                <CompanyItem icon={MapPin} title='Location' content='Bắc Từ Liêm, Hà Nội' />

                <iframe
                  className='h-[266px] rounded-2xl border border-gray-500'
                  src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4324.506579709928!2d105.73972116222997!3d21.052534559259648!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31345457e292d5bf%3A0x20ac91c94d74439a!2zVHLGsOG7nW5nIMSQ4bqhaSBo4buNYyBDw7RuZyBuZ2hp4buHcCBIw6AgTuG7mWk!5e1!3m2!1svi!2s!4v1758478810665!5m2!1svi!2s'
                  loading='lazy'
                ></iframe>
              </div>
            </div>
          </div>

          <div className='my-[60px] flex flex-col gap-10'>
            <div className='flex flex-col gap-10'>
              <h2 className='text-[50px] font-semibold'>Related Jobs</h2>
              <p>abc abc abc</p>
            </div>
            <div>
              <JobItem />
              <JobItem />
              <JobItem />
            </div>
          </div>
        </section>
      </div>
    </>
  );
};

export default JobDetail;
