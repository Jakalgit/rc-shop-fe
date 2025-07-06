import axios from 'axios'

const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

const $host = axios.create({
	baseURL: `${backendUrl}/api`,
})

export {
	$host,
}