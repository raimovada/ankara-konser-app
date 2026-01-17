'use client';

import React, { useState, useEffect } from 'react';
import { Calendar, MapPin, Music, Bell, Heart, User, Home } from 'lucide-react';

export default function AnkaraKonserApp() {
  const [currentPage, setCurrentPage] = useState('home');
  const [userProfile, setUserProfile] = useState(null);
  const [likedEvents, setLikedEvents] = useState([]);
  const [notifications, setNotifications] = useState([]);

  const allEvents = [
    {
      id: 1,
      name: "Mor ve Ötesi",
      genre: "Rock",
      date: "2026-01-25",
      time: "21:00",
      venue: "Jolly Joker Ankara",
      price: "350₺",
      image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
      description: "Türk rock'ının efsane grubu Mor ve Ötesi, yeni albüm konseriyle Ankara'da!"
    },
    {
      id: 2,
      name: "Sezen Aksu",
      genre: "Pop",
      date: "2026-01-28",
      time: "20:30",
      venue: "AKM Ankara",
      price: "500₺",
      image: "https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?w=800&h=600&fit=crop",
      description: "Minik Serçe'nin unutulmaz şarkılarıyla dolu özel konser!"
    },
    {
      id: 3,
      name: "Gaye Su Akyol",
      genre: "Alternative",
      date: "2026-01-30",
      time: "22:00",
      venue: "IF Performance Hall",
      price: "280₺",
      image: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=600&fit=crop",
      description: "Psikedelik rock ve Anadolu müziğinin benzersiz karışımı!"
    },
    {
      id: 4,
      name: "Burhan Öçal & İstanbul Oriental Ensemble",
      genre: "World Music",
      date: "2026-02-05",
      time: "20:00",
      venue: "CSO Ada Ankara",
      price: "220₺",
      image: "https://images.unsplash.com/photo-1511735111819-9a3f7709049c?w=800&h=600&fit=crop",
      description: "Dünya müziğinin ustaları geleneksel Türk müziğiyle buluşuyor!"
    },
    {
      id: 5,
      name: "Teoman",
      genre: "Rock",
      date: "2026-02-08",
      time: "21:00",
      venue: "Congresium Ankara",
      price: "400₺",
      image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop",
      description: "90'ların rock ikonu Teoman, en sevilen şarkılarıyla sahnede!"
    },
    {
      id: 6,
      name: "Melike Şahin",
      genre: "Alternative",
      date: "2026-02-12",
      time: "21:30",
      venue: "Kite Ankara",
      price: "200₺",
      image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=800&h=600&fit=crop",
      description: "Indie müziğin yükselen yıldızı Melike Şahin ilk kez Ankara'da!"
    },
    {
      id: 7,
      name: "Duman",
      genre: "Rock",
      date: "2026-02-15",
      time: "21:00",
      venue: "Jolly Joker Ankara",
      price: "380₺",
      image: "https://images.unsplash.com/photo-1501612780327-45045538702b?w=800&h=600&fit=crop",
      description: "Duman'dan nostalji dolu bir gece! Eski ve yeni şarkılarla dolu set."
    },
    {
      id: 8,
      name: "Caz Festivali - Kerem Görsev Trio",
      genre: "Jazz",
      date: "2026-02-20",
      time: "20:00",
      venue: "CSO Ada Ankara",
      price: "180₺",
      image: "https://images.unsplash.com/photo-1415201364774-f6f0bb35f28f?w=800&h=600&fit=crop",
      description: "Türk caz piyanosunun duayeni Kerem Görsev, üç kişilik topluluğuyla sahnede!"
    }
  ];

  const musicGenres = [
    { id: 'rock', name: 'Rock', icon: '🎸' },
    { id: 'pop', name: 'Pop', icon: '🎤' },
    { id: 'jazz', name: 'Jazz', icon: '🎷' },
    { id: 'electronic', name: 'Elektronik', icon: '🎧' },
    { id: 'alternative', name: 'Alternative', icon: '🎵' },
    { id: 'classical', name: 'Klasik', icon: '🎻' },
    { id: 'rap', name: 'Rap/Hip-Hop', icon: '🎤' },
    { id: 'world', name: 'Dünya Müziği', icon: '🌍' }
  ];

  useEffect(() => {
    if (userProfile) {
      const mockNotifications = [
        {
          id: 1,
          type: 'recommendation',
          title: 'Bu hafta sonu için öneri!',
          message: `${userProfile.preferences.includes('rock') ? 'Mor ve Ötesi' : 'Gaye Su Akyol'} konserine bakmak ister misiniz?`,
          time: '2 saat önce'
        },
        {
          id: 2,
          type: 'new',
          title: 'Yeni etkinlik eklendi',
          message: 'Sevdiğiniz türde yeni bir konser: Teoman - 8 Şubat',
          time: '1 gün önce'
        }
      ];
      setNotifications(mockNotifications);
    }
  }, [userProfile]);

  const getRecommendedEvents = () => {
    if (!userProfile) return allEvents.slice(0, 4);
    
    const recommended = allEvents.filter(event => 
      userProfile.preferences.some(pref => 
        event.genre.toLowerCase().includes(pref.toLowerCase())
      )
    );
    
    return recommended.length > 0 ? recommended : allEvents.slice(0, 4);
  };

  const toggleLike = (eventId) => {
    if (likedEvents.includes(eventId)) {
      setLikedEvents(likedEvents.filter(id => id !== eventId));
    } else {
      setLikedEvents([...likedEvents, eventId]);
    }
  };

  const OnboardingPage = () => {
    const [selectedGenres, setSelectedGenres] = useState([]);
    const [name, setName] = useState('');

    const toggleGenre = (genre) => {
      if (selectedGenres.includes(genre)) {
        setSelectedGenres(selectedGenres.filter(g => g !== genre));
      } else {
        setSelectedGenres([...selectedGenres, genre]);
      }
    };

    const completeOnboarding = () => {
      if (selectedGenres.length > 0 && name) {
        setUserProfile({
          name,
          preferences: selectedGenres
        });
        setCurrentPage('home');
      }
    };

    return (
      <div style={{
        minHeight: '100vh',
        background: 'linear-gradient(to bottom right, #581c87, #0f172a, #000000)',
        color: 'white',
        padding: '24px'
      }}>
        <div style={{ maxWidth: '672px', margin: '0 auto' }}>
          <div style={{ textAlign: 'center', marginBottom: '32px', marginTop: '48px' }}>
            <div style={{
              width: '80px',
              height: '80px',
              background: '#9333ea',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px'
            }}>
              <Music size={40} />
            </div>
            <h1 style={{ fontSize: '36px', fontWeight: 'bold', marginBottom: '8px' }}>Hoş Geldiniz!</h1>
            <p style={{ color: '#d1d5db' }}>Size özel konser önerileri için birkaç şey soralım</p>
          </div>

          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <label style={{ display: 'block', fontSize: '14px', fontWeight: '600', marginBottom: '8px' }}>
              Adınız
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="İsminizi girin"
              style={{
                width: '100%',
                background: '#334155',
                borderRadius: '8px',
                padding: '12px 16px',
                outline: 'none',
                border: 'none',
                color: 'white',
                fontSize: '16px'
              }}
            />
          </div>

          <div style={{
            background: 'rgba(30, 41, 59, 0.5)',
            backdropFilter: 'blur(12px)',
            borderRadius: '16px',
            padding: '24px',
            marginBottom: '32px'
          }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>
              Hangi müzik türlerini seviyorsunuz?
            </h2>
            <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '16px' }}>
              En az bir tür seçin
            </p>
            
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '12px'
            }}>
              {musicGenres.map(genre => (
                <button
                  key={genre.id}
                  onClick={() => toggleGenre(genre.name)}
                  style={{
                    padding: '16px',
                    borderRadius: '12px',
                    textAlign: 'left',
                    border: 'none',
                    cursor: 'pointer',
                    background: selectedGenres.includes(genre.name) ? '#9333ea' : '#334155',
                    transform: selectedGenres.includes(genre.name) ? 'scale(1.05)' : 'scale(1)',
                    transition: 'all 0.2s',
                    color: 'white'
                  }}
                >
                  <div style={{ fontSize: '32px', marginBottom: '4px' }}>{genre.icon}</div>
                  <div style={{ fontWeight: '600' }}>{genre.name}</div>
                </button>
              ))}
            </div>
          </div>

          <button
            onClick={completeOnboarding}
            disabled={selectedGenres.length === 0 || !name}
            style={{
              width: '100%',
              background: selectedGenres.length === 0 || !name ? '#4b5563' : '#9333ea',
              padding: '16px',
              borderRadius: '12px',
              fontWeight: 'bold',
              fontSize: '18px',
              border: 'none',
              cursor: selectedGenres.length === 0 || !name ? 'not-allowed' : 'pointer',
              color: 'white',
              transition: 'background 0.2s'
            }}
          >
            Başlayalım! 🎉
          </button>
        </div>
      </div>
    );
  };

  const HomePage = () => {
    const recommendedEvents = getRecommendedEvents();

    return (
      <div style={{ paddingBottom: '96px' }}>
        <div style={{
          background: 'linear-gradient(to right, #581c87, #7e22ce)',
          padding: '24px',
          borderRadius: '0 0 24px 24px',
          marginBottom: '24px'
        }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <div>
              <h1 style={{ fontSize: '24px', fontWeight: 'bold' }}>Merhaba, {userProfile?.name}! 👋</h1>
              <p style={{ color: '#e9d5ff', fontSize: '14px' }}>Bugün hangi konsere gidelim?</p>
            </div>
            <button style={{
              width: '48px',
              height: '48px',
              background: '#6b21a8',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: 'none',
              cursor: 'pointer',
              position: 'relative'
            }}>
              <Bell size={24} color="white" />
              {notifications.length > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  width: '20px',
                  height: '20px',
                  background: '#ef4444',
                  borderRadius: '50%',
                  fontSize: '12px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  {notifications.length}
                </span>
              )}
            </button>
          </div>
        </div>

        {notifications.length > 0 && (
          <div style={{
            margin: '0 24px 24px',
            background: 'linear-gradient(to right, #9333ea, #ec4899)',
            borderRadius: '16px',
            padding: '16px'
          }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ marginTop: '4px', flexShrink: 0 }}>📈</div>
              <div>
                <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{notifications[0].title}</h3>
                <p style={{ fontSize: '14px', color: '#fce7f3' }}>{notifications[0].message}</p>
              </div>
            </div>
          </div>
        )}

        <div style={{ padding: '0 24px 24px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold' }}>Size Özel Öneriler</h2>
            <button style={{
              color: '#a78bfa',
              fontSize: '14px',
              fontWeight: '600',
              background: 'none',
              border: 'none',
              cursor: 'pointer'
            }}>
              Tümünü Gör
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {recommendedEvents.slice(0, 3).map(event => (
              <div key={event.id} style={{ background: '#1e293b', borderRadius: '16px', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '192px' }}>
                  <img src={event.image} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)'
                  }} />
                  <button
                    onClick={() => toggleLike(event.id)}
                    style={{
                      position: 'absolute',
                      top: '12px',
                      right: '12px',
                      width: '40px',
                      height: '40px',
                      background: 'rgba(0,0,0,0.5)',
                      backdropFilter: 'blur(8px)',
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: 'none',
                      cursor: 'pointer'
                    }}
                  >
                    <Heart
                      size={20}
                      color={likedEvents.includes(event.id) ? '#ef4444' : 'white'}
                      fill={likedEvents.includes(event.id) ? '#ef4444' : 'none'}
                    />
                  </button>
                  <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, padding: '16px' }}>
                    <span style={{
                      display: 'inline-block',
                      background: '#9333ea',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      fontSize: '12px',
                      fontWeight: '600',
                      marginBottom: '8px'
                    }}>
                      {event.genre}
                    </span>
                    <h3 style={{ fontSize: '20px', fontWeight: 'bold' }}>{event.name}</h3>
                  </div>
                </div>
                <div style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', gap: '16px', fontSize: '14px', color: '#d1d5db', marginBottom: '12px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Calendar size={16} />
                      <span>{new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'long' })}</span>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <MapPin size={16} />
                      <span>{event.venue}</span>
                    </div>
                  </div>
                  <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '12px' }}>{event.description}</p>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '24px', fontWeight: 'bold', color: '#a78bfa' }}>{event.price}</span>
                    <button style={{
                      background: '#9333ea',
                      padding: '8px 24px',
                      borderRadius: '999px',
                      fontWeight: '600',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'white',
                      transition: 'background 0.2s'
                    }}>
                      Bilet Al
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div style={{ padding: '0 24px' }}>
          <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '16px' }}>Tüm Etkinlikler</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
            {allEvents.slice(3).map(event => (
              <div key={event.id} style={{ background: '#1e293b', borderRadius: '12px', overflow: 'hidden' }}>
                <div style={{ position: 'relative', height: '128px' }}>
                  <img src={event.image} alt={event.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <div style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(0,0,0,0.9), transparent)'
                  }} />
                  <div style={{ position: 'absolute', bottom: '8px', left: '8px', right: '8px' }}>
                    <h3 style={{
                      fontWeight: 'bold',
                      fontSize: '14px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {event.name}
                    </h3>
                  </div>
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#9ca3af', marginBottom: '8px' }}>
                    <Calendar size={12} />
                    <span>{new Date(event.date).toLocaleDateString('tr-TR', { day: 'numeric', month: 'short' })}</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ color: '#a78bfa', fontWeight: 'bold', fontSize: '14px' }}>{event.price}</span>
                    <button style={{
                      fontSize: '12px',
                      background: 'rgba(147, 51, 234, 0.2)',
                      color: '#a78bfa',
                      padding: '4px 12px',
                      borderRadius: '999px',
                      border: 'none',
                      cursor: 'pointer'
                    }}>
                      Detay
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  const FavoritesPage = () => {
    const favoriteEvents = allEvents.filter(event => likedEvents.includes(event.id));

    return (
      <div style={{ padding: '24px', paddingBottom: '96px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>Favorilerim ❤️</h1>
        {favoriteEvents.length === 0 ? (
          <div style={{ textAlign: 'center', paddingTop: '48px', paddingBottom: '48px' }}>
            <Heart size={64} color="#4b5563" style={{ margin: '0 auto 16px' }} />
            <p style={{ color: '#9ca3af' }}>Henüz favori etkinliğiniz yok</p>
            <button
              onClick={() => setCurrentPage('home')}
              style={{
                marginTop: '16px',
                background: '#9333ea',
                padding: '8px 24px',
                borderRadius: '999px',
                border: 'none',
                cursor: 'pointer',
                color: 'white',
                fontWeight: '600'
              }}
            >
              Etkinlikleri Keşfet
            </button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            {favoriteEvents.map(event => (
              <div key={event.id} style={{
                background: '#1e293b',
                borderRadius: '16px',
                padding: '16px',
                display: 'flex',
                gap: '16px'
              }}>
                <img
                  src={event.image}
                  alt={event.name}
                  style={{ width: '96px', height: '96px', borderRadius: '12px', objectFit: 'cover' }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ fontWeight: 'bold', marginBottom: '4px' }}>{event.name}</h3>
                  <p style={{ fontSize: '14px', color: '#9ca3af', marginBottom: '8px' }}>{event.venue}</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: '#9ca3af' }}>
                    <Calendar size={12} />
                    <span>{new Date(event.date).toLocaleDateString('tr-TR')}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleLike(event.id)}
                  style={{ alignSelf: 'flex-start', background: 'none', border: 'none', cursor: 'pointer' }}
                >
                  <Heart size={24} color="#ef4444" fill="#ef4444" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    );
  };

  const ProfilePage = () => {
    return (
      <div style={{ padding: '24px', paddingBottom: '96px' }}>
        <h1 style={{ fontSize: '28px', fontWeight: 'bold', marginBottom: '24px' }}>Profilim</h1>
        <div style={{ background: '#1e293b', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: '#9333ea',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px'
          }}>
            <User size={40} />
          </div>
          <h2 style={{ fontSize: '24px', fontWeight: 'bold', textAlign: 'center', marginBottom: '8px' }}>
            {userProfile?.name}
          </h2>
          <p style={{ textAlign: 'center', color: '#9ca3af' }}>Konser Tutkunusu 🎵</p>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '16px' }}>Sevdiğim Türler</h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
            {userProfile?.preferences.map((genre, idx) => (
              <span key={idx} style={{
                background: '#9333ea',
                padding: '8px 16px',
                borderRadius: '999px',
                fontSize: '14px'
              }}>
                {genre}
              </span>
            ))}
          </div>
        </div>

        <div style={{ background: '#1e293b', borderRadius: '16px', padding: '24px', marginBottom: '16px' }}>
          <h3 style={{ fontWeight: 'bold', marginBottom: '16px' }}>İstatistikler</h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', textAlign: 'center' }}>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a78bfa' }}>{likedEvents.length}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>Favori</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a78bfa' }}>12</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>Gidilen</div>
            </div>
            <div>
              <div style={{ fontSize: '24px', fontWeight: 'bold', color: '#a78bfa' }}>3</div>
              <div style={{ fontSize: '12px', color: '#9ca3af' }}>Planlanan</div>
            </div>
          </div>
        </div>

        <button
          onClick={() => {
            setUserProfile(null);
            setLikedEvents([]);
            setCurrentPage('onboarding');
          }}
          style={{
            width: '100%',
            background: '#dc2626',
            padding: '12px',
            borderRadius: '12px',
            fontWeight: '600',
            border: 'none',
            cursor: 'pointer',
            color: 'white',
            transition: 'background 0.2s'
          }}
        >
          Çıkış Yap
        </button>
      </div>
    );
  };

  if (!userProfile) {
    return <OnboardingPage />;
  }

  return (
    <div style={{ minHeight: '100vh', background: '#0f172a', color: 'white' }}>
      {currentPage === 'home' && <HomePage />}
      {currentPage === 'favorites' && <FavoritesPage />}
      {currentPage === 'profile' && <ProfilePage />}

      <div style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        background: '#1e293b',
        borderTop: '1px solid #334155'
      }}>
        <div style={{
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          height: '64px'
        }}>
          <button
            onClick={() => setCurrentPage('home')}
