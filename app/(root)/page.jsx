import Feed from '../../components/layout/Feed';


export default async function Home() {
  let data = null;
  try {
    const result = await fetch(process.env.URL + '/api/post/all', {
      method: 'POST',
      cache: 'no-store',
    });
    data = await result.json();
    // console.log(data)
  } catch (error) {
    console.error('Error fetching posts:', error);
  }
  return (
    <div className='min-h-screen max-w-xl mx-auto border-r border-l border-'>      
      <Feed data={data} />
    </div>
  );
}
