<?php

namespace App\Service;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Contracts\HttpClient\HttpClientInterface;

class TmdbApiService
{
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

    private function callApi(string $url, array $query = [], string $lang = 'fr-FR'): array
    {
        $options['query'] = ['language' => $lang];
        if (!empty($query)) {
            $options['query'] = array_merge($query, $options['query']);
        }
        $response = $this->client->request('GET', $url, $options);

        return ($response->getStatusCode() === Response::HTTP_OK) ? $response->toArray() : [];
    }
}
