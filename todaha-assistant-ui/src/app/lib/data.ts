import { unstable_noStore as noStore } from 'next/cache';
import { FormData } from '../landing/contact/page';

export async function fetchStatsCardsData(assistant_id: string = 'asst_gE6RWQvul8PGsCRMJeSc2Elo') {
  noStore()
  try {
    // Call an external API endpoint to get posts
  const res = await fetch(`http://localhost:8080/chat/count-messages?assistant_id=${assistant_id}`)
  const data = await res.json()
  console.log(data.count)
  return data.count

} catch (error) {
  console.log(error);
}

 }

 export function sendEmail(data: FormData) {
  const apiEndpoint = '/api/email';

  fetch(apiEndpoint, {
    method: 'POST',
    body: JSON.stringify(data),
  })
    .then((res) => res.json())
    .then((response) => {
      alert(response.message);
    })
    .catch((err) => {
      alert(err);
    });
}


