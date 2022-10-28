<?php

namespace App\Service;

use Symfony\Component\Cache\Adapter\FilesystemAdapter;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\Cache\ItemInterface;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class TmdbApiService
{
    const IMG_BASE_URL_KEY = 'img_base_url_key';
    const IMG_BACKDROP_SIZE = 'w1280';
    const IMG_POSTER_SIZE = 'w154';
    private $client;

    public function __construct(HttpClientInterface $tmdbApiClient)
    {
        $this->client = $tmdbApiClient;
    }

    public function getGenres(): array
    {
        $res = $this->callApi('genre/movie/list');

        return empty($res) ? [] : $res['genres'];
    }

    public function getPopular(): array
    {
        $res = $this->callApi('movie/popular');

        return empty($res) ? [] : $res['results'][0];
    }

    public function byGenres(?string $genreIds): array
    {
        $res = $this->callApi('discover/movie', ['with_genres' => trim($genreIds)]);

        return empty($res) ? [] : $res['results'];
    }

    public function search(string $text): array
    {
        if (empty($text) || strlen($text) <= 2) {
            return [];
        }
        $res = $this->callApi('search/movie', ['query' => $text]);

        return empty($res) ? [] : array_column($res['results'], 'title');
    }

    public function getInfo(int $id): array
    {
        $res = $this->callApi('movie/' . $id, ['append_to_response' => 'videos']);
        if (empty($res)) {
            return $res;
        }
        $res['backdrop_path'] = sprintf('%s%s%s', $this->getImgBaseUrl(), self::IMG_BACKDROP_SIZE, $res['backdrop_path']);
        $res['poster_path'] = sprintf('%s%s%s', $this->getImgBaseUrl(), self::IMG_POSTER_SIZE, $res['poster_path']);

        return $res;
    }

    private function callApi(string $url, array $query = [], string $lang = 'fr-FR'): array
    {
        $options['query'] = ['language' => $lang];
        if (!empty($query)) {
            $options['query'] = array_merge($query, $options['query']);
        }
        $response = $this->client->request('GET', $url, $options);

        return ($response->getStatusCode() === Response::HTTP_OK) ? $response->toArray() : [];
    }

    /**
     * Get the image base url and cache it for 24h
     */
    private function getImgBaseUrl(): string
    {
        $cache = new FilesystemAdapter();
        $value = $cache->get(self::IMG_BASE_URL_KEY, function (ItemInterface $item) {
            $item->expiresAfter(3600 * 24);
            $res = $this->callApi('configuration');
            if (!empty($res)) {
                return $res['images']['secure_base_url'];
            }
            return '';
        });

        return $value;
    }
}
