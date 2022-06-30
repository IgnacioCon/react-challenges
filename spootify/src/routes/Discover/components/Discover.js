import React, { Component } from 'react';
import DiscoverBlock from './DiscoverBlock/components/DiscoverBlock';
import '../styles/_discover.scss';
import api from '../../../config.js';
import axios from 'axios';

export default class Discover extends Component {
  constructor() {
    super();

    this.state = {
      newReleases: [],
      playlists: [],
      categories: []
    };
  }

  componentDidMount() {
    this.fetchToken()
      .then((token) => {
        return Promise.all([
          this.fetchNewReleases(token),
          this.fetchFeaturedPlaylists(token),
          this.fetchCategories(token),
        ]);
      })
      .then((data) => {
        this.setState({
          newReleases: data[0],
          playlists: data[1],
          categories: data[2],
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  fetchToken = async () => {
    const res = await axios({
      method: 'POST',
      url: api.api.authUrl,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: 'grant_type=client_credentials',
      auth: {
        username: `${api.api.clientId}`,
        password: `${api.api.clientSecret}`,
      },
    });
    if (res.status === 200) {
      return res.data.access_token;
    }
  };

  fetchNewReleases = async (bearerToken) => {
    const res = await axios.get(`${api.api.baseUrl}/browse/new-releases`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return res.data.albums.items;
  };

  fetchFeaturedPlaylists = async (bearerToken) => {
    const res = await axios.get(
      `${api.api.baseUrl}/browse/featured-playlists`,
      {
        headers: {
          Authorization: `Bearer ${bearerToken}`,
        },
      }
    );

    return res.data.playlists.items;
  };

  fetchCategories = async (bearerToken) => {
    const res = await axios.get(`${api.api.baseUrl}/browse/categories`, {
      headers: {
        Authorization: `Bearer ${bearerToken}`,
      },
    });

    return res.data.categories.items;
  };
  
  render() {
    const { newReleases, playlists, categories } = this.state;

    return (
      <div className='discover'>
        <DiscoverBlock
          text='RELEASED THIS WEEK'
          id='released'
          data={newReleases}
        />
        <DiscoverBlock
          text='FEATURED PLAYLISTS'
          id='featured'
          data={playlists}
        />
        <DiscoverBlock
          text='BROWSE'
          id='browse'
          data={categories}
          imagesKey='icons'
        />
      </div>
    );
  }
}
