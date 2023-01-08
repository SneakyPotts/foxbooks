import {useSelector} from 'react-redux';
import classNames from 'classnames';
import {useEffect, useRef, useState} from "react";
import {Swiper, SwiperSlide} from 'swiper/react';
import {useRouter} from "next/router";
import {Navigation} from 'swiper/core';
import ShowAll from '../shared/common/showAll/ShowAll';
import Alphabet from './Alphabet/Alphabet';
import Hero from './Hero/Hero';
import Categories from './Categories/index';
import BookUpdates from './Updates';
import Filters from '../Filter';
import Introductory from './Introductory block';
import About from './About';
import Book from '../shared/common/book';
import MobileBlock from './MobileBlock';
import ArrowRight from '../../public/chevron-right.svg';
import css from './home.module.scss';
import cssBook from './../shared/common/book/book.module.scss';


const response ={
		"genres": [
			{
				"id": 17,
				"name": "Боевики",
				"slug": "boeviki"
			},
			{
				"id": 12,
				"name": "Военные",
				"slug": "voennye"
			},
			{
				"id": 7,
				"name": "Детективы",
				"slug": "detektivy"
			},
			{
				"id": 13,
				"name": "Детская проза",
				"slug": "detskaya-proza"
			},
			{
				"id": 11,
				"name": "Домашняя",
				"slug": "domasnyaya"
			},
			{
				"id": 24,
				"name": "Драма",
				"slug": "drama"
			},
			{
				"id": 19,
				"name": "Историческая проза",
				"slug": "istoriceskaya-proza"
			},
			{
				"id": 10,
				"name": "Классика",
				"slug": "klassika"
			},
			{
				"id": 23,
				"name": "Медицина",
				"slug": "medicina"
			},
			{
				"id": 4,
				"name": "Научная фантастика",
				"slug": "naucnaya-fantastika"
			},
			{
				"id": 21,
				"name": "Политика",
				"slug": "politika"
			},
			{
				"id": 22,
				"name": "Приключение",
				"slug": "priklyucenie"
			},
			{
				"id": 18,
				"name": "Психология",
				"slug": "psixologiya"
			},
			{
				"id": 9,
				"name": "Романы",
				"slug": "romany"
			},
			{
				"id": 16,
				"name": "Сказки",
				"slug": "skazki"
			},
			{
				"id": 5,
				"name": "Современная проза",
				"slug": "sovremennaya-proza"
			},
			{
				"id": 6,
				"name": "Триллеры",
				"slug": "trillery"
			},
			{
				"id": 20,
				"name": "Ужасы и мистика",
				"slug": "uzasy-i-mistika"
			},
			{
				"id": 14,
				"name": "Фэнтези",
				"slug": "fentezi"
			},
			{
				"id": 15,
				"name": "Эротика",
				"slug": "erotika"
			},
			{
				"id": 8,
				"name": "Юмористическая проза",
				"slug": "yumoristiceskaya-proza"
			},
			{
				"id": 97,
				"name": "Спорт, здоровье, красота",
				"slug": "sport-zdorove-krasota"
			}
		],
		"newBooksCompilations": {
			"id": 6,
			"title": "Новинки книг",
			"books": [
				{
					"id": 9,
					"title": "А время уходит",
					"slug": "a-vremia-ukhodit-59096",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2017\/62207.jpg",
					"rate_avg": 0,
					"views_count": 13,
					"type": "books",
					"authors": [
						{
							"author": "Мэри Хиггинс Кларк",
							"slug": "9-meri-xiggins-klark"
						}
					],
					"genres": [
						{
							"id": 6,
							"name": "Триллеры",
							"slug": "trillery"
						}
					]
				},
				{
					"id": 6,
					"title": "А вот еще...",
					"slug": "a-vot-eshche-29390",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2012\/30937.jpg",
					"rate_avg": 0,
					"views_count": 12,
					"type": "books",
					"authors": [
						{
							"author": "Йон Колфер",
							"slug": "6-ion-kolfer"
						}
					],
					"genres": [
						{
							"id": 4,
							"name": "Научная фантастика",
							"slug": "naucnaya-fantastika"
						},
						{
							"id": 97,
							"name": "Спорт, здоровье, красота",
							"slug": "sport-zdorove-krasota"
						}
					]
				},
				{
					"id": 10,
					"title": "А вы, случайно, не убийца?",
					"slug": "a-vy-sluchaino-ne-ubiitsa-13072",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2012\/13760.jpg",
					"rate_avg": 3,
					"views_count": 12,
					"type": "books",
					"authors": [
						{
							"author": "Никита Костылев",
							"slug": "10-nikita-kostylev"
						}
					],
					"genres": [
						{
							"id": 7,
							"name": "Детективы",
							"slug": "detektivy"
						}
					]
				},
				{
					"id": 7,
					"title": "А вот и завтра",
					"slug": "a-vot-i-zavtra-74975",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2019\/78922.jpg",
					"rate_avg": 0,
					"views_count": 6,
					"type": "books",
					"authors": [
						{
							"author": "Михаил Веллер",
							"slug": "7-mixail-veller"
						}
					],
					"genres": [
						{
							"id": 5,
							"name": "Современная проза",
							"slug": "sovremennaya-proza"
						}
					]
				},
				{
					"id": 11,
					"title": "А дело было так...",
					"slug": "a-delo-bylo-tak-30236",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2008\/31828.jpg",
					"rate_avg": 0,
					"views_count": 7,
					"type": "books",
					"authors": [
						{
							"author": "Михаил Высоцкий",
							"slug": "11-mixail-vysockii"
						}
					],
					"genres": [
						{
							"id": 8,
							"name": "Юмористическая проза",
							"slug": "yumoristiceskaya-proza"
						}
					]
				},
				{
					"id": 8,
					"title": "А вот и Полетта",
					"slug": "a-vot-i-poletta-38777",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2014\/40818.jpg",
					"rate_avg": 0,
					"views_count": 5,
					"type": "books",
					"authors": [
						{
							"author": "Барбара Константин",
							"slug": "8-barbara-konstantin"
						}
					],
					"genres": [
						{
							"id": 5,
							"name": "Современная проза",
							"slug": "sovremennaya-proza"
						}
					]
				},
				{
					"id": 12,
					"title": "А другого глобуса у вас нет?",
					"slug": "a-drugogo-globusa-u-vas-net-26167",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2002\/27545.jpg",
					"rate_avg": 0,
					"views_count": 6,
					"type": "books",
					"authors": [
						{
							"author": "Михаил Вершовский",
							"slug": "12-mixail-versovskii"
						}
					],
					"genres": [
						{
							"id": 5,
							"name": "Современная проза",
							"slug": "sovremennaya-proza"
						}
					]
				},
				{
					"id": 14187,
					"title": "Гарри Поттер и Орден Феникса",
					"slug": "garri-potter-i-orden-feniksa-2204",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2321.jpg",
					"rate_avg": 5,
					"views_count": 5,
					"type": "books",
					"authors": [
						{
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					],
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					]
				},
				{
					"id": 45,
					"title": "А Роза упала... Дом, в котором живет месть",
					"slug": "a-roza-upala-dom-v-kotorom-zhivet-mest-31768",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2010\/33441.jpg",
					"rate_avg": 0,
					"views_count": 4,
					"type": "books",
					"authors": [
						{
							"author": "Наташа Апрелева",
							"slug": "44-natasa-apreleva"
						}
					],
					"genres": [
						{
							"id": 7,
							"name": "Детективы",
							"slug": "detektivy"
						}
					]
				},
				{
					"id": 34,
					"title": "А наутро радость",
					"slug": "a-nautro-radost-79349",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2019\/83526.jpg",
					"rate_avg": 0,
					"views_count": 6,
					"type": "books",
					"authors": [
						{
							"author": "Бетти Смит",
							"slug": "33-betti-smit"
						}
					],
					"genres": [
						{
							"id": 10,
							"name": "Классика",
							"slug": "klassika"
						}
					]
				},
				{
					"id": 33,
					"title": "А мы с тобой, брат, из пехоты. \"Из адов ад\"",
					"slug": "a-my-s-toboi-brat-iz-pekhoty-iz-adov-ad-32807",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2012\/34534.jpg",
					"rate_avg": 4,
					"views_count": 8,
					"type": "books",
					"authors": [
						{
							"author": "Артем Драбкин",
							"slug": "32-artem-drabkin"
						}
					],
					"genres": [
						{
							"id": 12,
							"name": "Военные",
							"slug": "voennye"
						}
					]
				},
				{
					"id": 32,
					"title": "А может, это любовь?",
					"slug": "a-mozhet-eto-liubov-88543",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2020\/93204.jpg",
					"rate_avg": 5,
					"views_count": 4,
					"type": "books",
					"authors": [
						{
							"author": "Ирис Ленская",
							"slug": "31-iris-lenskaya"
						}
					],
					"genres": [
						{
							"id": 9,
							"name": "Романы",
							"slug": "romany"
						}
					]
				},
				{
					"id": 22,
					"title": "А зори здесь тихие...",
					"slug": "a-zori-zdes-tikhie-1598",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2003\/1683.jpg",
					"rate_avg": 0,
					"views_count": 9,
					"type": "books",
					"authors": [
						{
							"author": "Борис Васильев",
							"slug": "21-boris-vasilev"
						}
					],
					"genres": [
						{
							"id": 12,
							"name": "Военные",
							"slug": "voennye"
						}
					]
				},
				{
					"id": 17,
					"title": "А жизнь была совсем хорошая...",
					"slug": "a-zhizn-byla-sovsem-khoroshaia-34902",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2014\/36739.jpg",
					"rate_avg": 0,
					"views_count": 2,
					"type": "books",
					"authors": [
						{
							"author": "Мария Метлицкая",
							"slug": "17-mariya-metlickaya"
						}
					],
					"genres": [
						{
							"id": 5,
							"name": "Современная проза",
							"slug": "sovremennaya-proza"
						}
					]
				}
			]
		},
		"dailyHotUpdates": [],
		"mainPageBookFilter": {
			"current_page": 1,
			"data": [
				{
					"id": 106330,
					"title": "Южная Африка. Прогулки на краю света",
					"slug": "iuzhnaia-afrika-progulki-na-kraiu-sveta-33306",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2011\/35059.jpg",
					"rate_avg": 5,
					"views_count": 4,
					"type": "books",
					"genres": [
						{
							"id": 5,
							"name": "Современная проза",
							"slug": "sovremennaya-proza"
						}
					],
					"authors": [
						{
							"id": 1321,
							"author": "Генри Воллам Мортон",
							"slug": "1321-genri-vollam-morton"
						}
					]
				},
				{
					"id": 95895,
					"title": "Три допроса по теории действия",
					"slug": "tri-doprosa-po-teorii-deistviia-41694",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2013\/43889.jpg",
					"rate_avg": 5,
					"views_count": 1,
					"type": "books",
					"genres": [
						{
							"id": 21,
							"name": "Политика",
							"slug": "politika"
						}
					],
					"authors": [
						{
							"id": 13318,
							"author": "Глеб Павловский",
							"slug": "13318-gleb-pavlovskii"
						},
						{
							"id": 34652,
							"author": "Александр Филиппов",
							"slug": "34652-aleksandr-filippov"
						}
					]
				},
				{
					"id": 119355,
					"title": "Сокровище для белого дракона",
					"slug": "sokrovishche-dlia-belogo-drakona-100711",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2022\/106012.jpg",
					"rate_avg": 5,
					"views_count": 2,
					"type": "books",
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					],
					"authors": [
						{
							"id": 12296,
							"author": "Лена Хейди",
							"slug": "12296-lena-xeidi"
						}
					]
				},
				{
					"id": 77347,
					"title": "Пять капель смерти",
					"slug": "piat-kapel-smerti-20421",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2013\/21496.jpg",
					"rate_avg": 5,
					"views_count": 1,
					"type": "books",
					"genres": [
						{
							"id": 7,
							"name": "Детективы",
							"slug": "detektivy"
						}
					],
					"authors": [
						{
							"id": 1702,
							"author": "Антон Чиж",
							"slug": "1702-anton-ciz"
						},
						{
							"id": 38983,
							"author": "Антон Чижъ",
							"slug": "anton-chizh"
						}
					]
				},
				{
					"id": 34905,
					"title": "Квест империя",
					"slug": "kvest-imperiia-60995",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2017\/64206.jpg",
					"rate_avg": 5,
					"views_count": 2,
					"type": "books",
					"genres": [
						{
							"id": 4,
							"name": "Научная фантастика",
							"slug": "naucnaya-fantastika"
						}
					],
					"authors": [
						{
							"id": 198,
							"author": "Макс Мах",
							"slug": "198-maks-max"
						}
					]
				},
				{
					"id": 14188,
					"title": "Гарри Поттер и Принц-полукровка",
					"slug": "garri-potter-i-prints-polukrovka-2205",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2322.jpg",
					"rate_avg": 5,
					"views_count": 8,
					"type": "books",
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					],
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					]
				},
				{
					"id": 14187,
					"title": "Гарри Поттер и Орден Феникса",
					"slug": "garri-potter-i-orden-feniksa-2204",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2321.jpg",
					"rate_avg": 5,
					"views_count": 5,
					"type": "books",
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					],
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					]
				},
				{
					"id": 14186,
					"title": "Гарри Поттер и Кубок огня",
					"slug": "garri-potter-i-kubok-ognia-2204",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2320.jpg",
					"rate_avg": 5,
					"views_count": 10,
					"type": "books",
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					],
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					]
				},
				{
					"id": 2062,
					"title": "Арбин",
					"slug": "arbin-87302",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2020\/91897.jpg",
					"rate_avg": 5,
					"views_count": 2,
					"type": "books",
					"genres": [
						{
							"id": 15,
							"name": "Эротика",
							"slug": "erotika"
						}
					],
					"authors": [
						{
							"id": 1579,
							"author": "Амина Асхадова",
							"slug": "1579-amina-asxadova"
						}
					]
				},
				{
					"id": 292,
					"title": "Агент в юбке",
					"slug": "agent-v-iubke-18192",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2013\/19150.jpg",
					"rate_avg": 5,
					"views_count": 5,
					"type": "books",
					"genres": [
						{
							"id": 7,
							"name": "Детективы",
							"slug": "detektivy"
						}
					],
					"authors": [
						{
							"id": 265,
							"author": "Николай Катаев",
							"slug": "265-nikolai-kataev"
						}
					]
				},
				{
					"id": 32,
					"title": "А может, это любовь?",
					"slug": "a-mozhet-eto-liubov-88543",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2020\/93204.jpg",
					"rate_avg": 5,
					"views_count": 4,
					"type": "books",
					"genres": [
						{
							"id": 9,
							"name": "Романы",
							"slug": "romany"
						}
					],
					"authors": [
						{
							"id": 31,
							"author": "Ирис Ленская",
							"slug": "31-iris-lenskaya"
						}
					]
				},
				{
					"id": 119364,
					"title": "А вдруг это правда?",
					"slug": "a-vdrug-eto-pravda-85634",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2020\/90142.jpg",
					"rate_avg": 5,
					"views_count": 3,
					"type": "books",
					"genres": [
						{
							"id": 5,
							"name": "Современная проза",
							"slug": "sovremennaya-proza"
						}
					],
					"authors": [
						{
							"id": 4,
							"author": "Мэрибет Мэйхью Уален",
							"slug": "4-meribet-meixyu-ualen"
						}
					]
				},
				{
					"id": 14190,
					"title": "Гарри Поттер и узник Азкабана",
					"slug": "garri-potter-i-uznik-azkabana-2203",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2319.jpg",
					"rate_avg": 4.5,
					"views_count": 7,
					"type": "books",
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					],
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					]
				},
				{
					"id": 119325,
					"title": "Суматоха под диваном",
					"slug": "sumatokha-pod-divanom-100441",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2022\/105728.jpg",
					"rate_avg": 4,
					"views_count": 1,
					"type": "books",
					"genres": [
						{
							"id": 7,
							"name": "Детективы",
							"slug": "detektivy"
						}
					],
					"authors": [
						{
							"id": 529,
							"author": "Татьяна Луганцева",
							"slug": "529-tatyana-luganceva"
						}
					]
				},
				{
					"id": 76017,
					"title": "Психоанализ. Введение в психологию бессознательных процессов",
					"slug": "psikhoanaliz-vvedenie-v-psikhologiiu-bessoznatelnykh-protsessov-72723",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2011\/76551.jpg",
					"rate_avg": 4,
					"views_count": 1,
					"type": "books",
					"genres": [
						{
							"id": 18,
							"name": "Психология",
							"slug": "psixologiya"
						}
					],
					"authors": [
						{
							"id": 23031,
							"author": "Томас Мюллер",
							"slug": "23031-tomas-myuller"
						},
						{
							"id": 37393,
							"author": "Петер Куттер",
							"slug": "37393-peter-kutter"
						}
					]
				},
				{
					"id": 290,
					"title": "Агент без прикрытия [= Агент особого назначения]",
					"slug": "agent-bez-prikrytiia-agent-osobogo-naznacheniia-16606",
					"active": 1,
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2009\/17481.jpg",
					"rate_avg": 4,
					"views_count": 1,
					"type": "books",
					"genres": [
						{
							"id": 17,
							"name": "Боевики",
							"slug": "boeviki"
						}
					],
					"authors": [
						{
							"id": 51,
							"author": "Сергей Зверев",
							"slug": "51-sergei-zverev"
						}
					]
				}
			],
			"first_page_url": "https:\/\/api.foxbooks.ec\/api\/home?page=1",
			"from": 1,
			"last_page": 6660,
			"last_page_url": "https:\/\/api.foxbooks.ec\/api\/home?page=6660",
			"links": [
				{
					"url": null,
					"label": "&laquo; Назад",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=1",
					"label": "1",
					"active": true
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=2",
					"label": "2",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=3",
					"label": "3",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=4",
					"label": "4",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=5",
					"label": "5",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=6",
					"label": "6",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=7",
					"label": "7",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=8",
					"label": "8",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=9",
					"label": "9",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=10",
					"label": "10",
					"active": false
				},
				{
					"url": null,
					"label": "...",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=6659",
					"label": "6659",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=6660",
					"label": "6660",
					"active": false
				},
				{
					"url": "https:\/\/api.foxbooks.ec\/api\/home?page=2",
					"label": "Вперёд &raquo;",
					"active": false
				}
			],
			"next_page_url": "https:\/\/api.foxbooks.ec\/api\/home?page=2",
			"path": "https:\/\/api.foxbooks.ec\/api\/home",
			"per_page": 16,
			"prev_page_url": null,
			"to": 16,
			"total": 106556
		},
		"compilations": [
			{
				"id": 102,
				"title": "Книги, которые всегда поддержат",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/g2yyL4K3cf4ediQ2VpirEyKEXb9hYNxUenNVPRde.jpg",
				"description": "Список книг для теплых книжных вечеров, которые увлекают, мотивируют и поддерживают настроение.",
				"created_by": 12,
				"type_id": 1,
				"location": null,
				"created_at": "2022-12-20T10:56:41.000000Z",
				"updated_at": "2022-12-28T17:14:03.000000Z",
				"slug": "knigi-kotorye-vsegda-podderzhat",
				"books_count": 6,
				"audio_books_count": 0,
				"views_count": 4,
				"total_books_count": 6
			},
			{
				"id": 100,
				"title": "Самые шокирующие и запрещённые книги",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/tHpzcZJLBEFbFj6RhjmyzD5DgYMcd9uBkCo1BF1X.jpg",
				"description": "В этой подборке — самые знаменитые книжные истории, подвергавшиеся цензуре и получившие большой шквал критики.",
				"created_by": 12,
				"type_id": 1,
				"location": null,
				"created_at": "2022-12-13T13:52:26.000000Z",
				"updated_at": "2022-12-28T17:04:27.000000Z",
				"slug": "samye-shokiruyushie-izapreshyonnye-knigi",
				"books_count": 14,
				"audio_books_count": 0,
				"views_count": 6,
				"total_books_count": 14
			},
			{
				"id": 88,
				"title": "Зимние истории для детей",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/VrzUuVJmw6FogNGzt2UYPapPdLRDwWzxLofANV33.jpg",
				"description": "Лучшие детские книги про снежную и сказочную зиму — здесь!",
				"created_by": 12,
				"type_id": 2,
				"location": null,
				"created_at": "2022-12-06T16:53:15.000000Z",
				"updated_at": "2022-12-28T17:59:33.000000Z",
				"slug": "zimnie-istorii-dlya-detej",
				"books_count": 5,
				"audio_books_count": 0,
				"views_count": 4,
				"total_books_count": 5
			},
			{
				"id": 23,
				"title": "8 самых грустных в мире книг",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/Cm8j73uLGUfa2NB0O3Rq77rjrHS6G52NpoYjwzXl.jpg",
				"description": "Предлагаем вам вспомнить самые грустные в мире книги, во время прочтения которых невозможно сдержать слезы.",
				"created_by": 12,
				"type_id": 1,
				"location": null,
				"created_at": "2022-07-15T16:56:24.000000Z",
				"updated_at": "2022-12-28T16:56:28.000000Z",
				"slug": "8-samyh-grustnyh-v-mire-knig",
				"books_count": 8,
				"audio_books_count": 0,
				"views_count": 4,
				"total_books_count": 8
			},
			{
				"id": 10,
				"title": "8 лучших книг для женщин за 50",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/29dF3T9aJrcyP8Tn9IZaOwIt9V6ijUnvoJ9e7H1U.jpg",
				"description": "Это подборка книг поможет вдохновиться и получать удовольствие от нового жизненного этапа.",
				"created_by": 12,
				"type_id": 1,
				"location": null,
				"created_at": "2022-05-09T23:29:30.000000Z",
				"updated_at": "2022-12-28T16:30:22.000000Z",
				"slug": "8-luchshih-knig-dlya-zhenshin-za-50",
				"books_count": 8,
				"audio_books_count": 0,
				"views_count": 6,
				"total_books_count": 8
			},
			{
				"id": 8,
				"title": "Самые популярные книги 2022 года",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/DIjNlKdfsP7zyTDBXvqAyqUks91UyevfuSZ5C7aX.jpg",
				"description": "В нашем рейтинге — самые продаваемые книги в 2022 году. Только есть нюанс: у нас вы можете прочесть их совершенно бесплатно.",
				"created_by": 12,
				"type_id": 1,
				"location": null,
				"created_at": "2022-05-03T16:01:07.000000Z",
				"updated_at": "2022-12-28T16:08:32.000000Z",
				"slug": "samye-populyarnye-knigi-2022-goda",
				"books_count": 7,
				"audio_books_count": 0,
				"views_count": 12,
				"total_books_count": 7
			},
			{
				"id": 11,
				"title": "Лучшие книги 19 века",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/Qs7rUAFmntKDSdi0WN5wrme01fHoP9j8vXPXnUP2.jpg",
				"description": "Наша подборка заставит читателя полюбить эту эпоху всей душой и сердцем.",
				"created_by": 12,
				"type_id": 1,
				"location": null,
				"created_at": "2022-05-03T16:01:07.000000Z",
				"updated_at": "2022-12-28T16:35:30.000000Z",
				"slug": "luchshie-knigi-19-veka",
				"books_count": 17,
				"audio_books_count": 2,
				"views_count": 5,
				"total_books_count": 19
			},
			{
				"id": 12,
				"title": "7 книг по здоровому питанию",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/sxfdTTSG0bBxWla65ZExz41VLKT4w5SNbTfHI3lj.jpg",
				"description": "Лучшая подборка книг по здоровому питанию, которые помогут похудеть.",
				"created_by": 12,
				"type_id": 1,
				"location": null,
				"created_at": "2022-05-03T16:01:07.000000Z",
				"updated_at": "2022-12-28T16:43:24.000000Z",
				"slug": "7-knig-po-zdorovomu-pitaniyu",
				"books_count": 10,
				"audio_books_count": 0,
				"views_count": 5,
				"total_books_count": 10
			},
			{
				"id": 13,
				"title": "5 жутко мистических книг",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/RVJMDU2lFrSZpJ8DMv3IL28rsdWNxUaKy1PuhOji.jpg",
				"description": "Мы выбрали 5 жутких мистических книг, которые напугают вас не на шутку.",
				"created_by": 12,
				"type_id": 1,
				"location": null,
				"created_at": "2022-05-03T16:01:07.000000Z",
				"updated_at": "2022-12-28T16:50:58.000000Z",
				"slug": "5-zhutko-misticheskih-knig",
				"books_count": 5,
				"audio_books_count": 0,
				"views_count": 5,
				"total_books_count": 5
			},
			{
				"id": 5,
				"title": "Новогодние детективы",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/t5PAhed4oeERF3CxBL7RgpDX56Jq2sRHqSHgrupM.jpg",
				"description": "Получите удовольствие во время новогоднего уикэнда с увлекательными новогодними детективами.",
				"created_by": 12,
				"type_id": 2,
				"location": null,
				"created_at": "2022-04-25T11:48:29.000000Z",
				"updated_at": "2022-12-28T17:49:42.000000Z",
				"slug": "novogodnie-detektivy",
				"books_count": 6,
				"audio_books_count": 0,
				"views_count": 6,
				"total_books_count": 6
			},
			{
				"id": 3,
				"title": "Лучшие фэнтези-книги русских авторов",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/HXkAUcvc8Ialn860yXRSNe1ZDkJXtDxibofRfEEc.jpg",
				"description": "Откройте для себя лучшие фэнтезийные произведения русских авторов, опубликованные не ранее 2019 года.",
				"created_by": 12,
				"type_id": 2,
				"location": null,
				"created_at": "2022-03-19T16:25:19.000000Z",
				"updated_at": "2022-12-28T17:44:00.000000Z",
				"slug": "luchshie-fentezi-knigi-russkih-avtorov",
				"books_count": 6,
				"audio_books_count": 0,
				"views_count": 9,
				"total_books_count": 6
			},
			{
				"id": 2,
				"title": "Лучшие антиутопии",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/Cra96TBVNrQfNjjNP8jIHBpP0uoPndL3NPH9poKo.jpg",
				"description": "В этой подборке писатели с разных уголков планеты предлагают своё видение будущего мира.",
				"created_by": 12,
				"type_id": 2,
				"location": null,
				"created_at": "2022-03-15T15:10:22.000000Z",
				"updated_at": "2022-12-28T17:34:01.000000Z",
				"slug": "luchshie-antiutopii",
				"books_count": 12,
				"audio_books_count": 0,
				"views_count": 7,
				"total_books_count": 12
			},
			{
				"id": 1,
				"title": "Мистические детективы",
				"background": "https:\/\/api.foxbooks.ec\/storage\/CompilationImages\/IgIBKmd7JLpJRcicsgCJ0obOIAKeZOjiSROOq5Jf.jpg",
				"description": "Разнообразьте вечерний досуг, распутывая клубок из тайн, интриг и хитросплетений, щедро приправленных мистикой.",
				"created_by": 12,
				"type_id": 2,
				"location": null,
				"created_at": "2022-03-15T15:09:22.000000Z",
				"updated_at": "2022-12-28T17:25:18.000000Z",
				"slug": "misticheskie-detektivy",
				"books_count": 9,
				"audio_books_count": 0,
				"views_count": 12,
				"total_books_count": 9
			}
		],
		"audioBooksList": {
			"id": 7,
			"title": "Некогда читать слушайте",
			"audio_books": [
				{
					"id": 7,
					"title": "Контакт",
					"genre_id": 25,
					"slug": "kontakt-7",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/audiobooks\/covers\/1976\/kontakt.jpg",
					"rate_avg": 0,
					"views_count": 6,
					"type": "audioBooks",
					"authors": [
						{
							"author": "Анар",
							"slug": "29337-anar"
						}
					],
					"genre": {
						"id": 25,
						"name": "Фантастика, фэнтези",
						"slug": "fantastika-fentezi"
					}
				},
				{
					"id": 14,
					"title": "Шерше ля фам, или красные розы",
					"genre_id": 28,
					"slug": "serse-lya-fam-ili-krasnye-rozy-14",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/audiobooks\/covers\/3149\/shershe-lja-fam-ili-krasnye-rozy.jpg",
					"rate_avg": 0,
					"views_count": 2,
					"type": "audioBooks",
					"authors": [
						{
							"author": "Джахангир Абдуллаев",
							"slug": "29343-dzaxangir-abdullaev"
						}
					],
					"genre": {
						"id": 28,
						"name": "Роман, проза",
						"slug": "roman-proza"
					}
				},
				{
					"id": 9,
					"title": "Реки Лондона",
					"genre_id": 25,
					"slug": "reki-londona-9",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/audiobooks\/covers\/2011\/reki-londona.jpg",
					"rate_avg": 0,
					"views_count": 5,
					"type": "audioBooks",
					"authors": [
						{
							"author": "Бен Ааронович",
							"slug": "16567-ben-aaronovic"
						}
					],
					"genre": {
						"id": 25,
						"name": "Фантастика, фэнтези",
						"slug": "fantastika-fentezi"
					}
				},
				{
					"id": 1,
					"title": "Седьмое Солнце: игры с вниманием",
					"genre_id": 97,
					"slug": "sedmoe-solnce-igry-s-vnimaniem",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/audiobooks\/covers\/2983\/sedmoe-solnce-igry-s-vnimaniem.jpg",
					"rate_avg": 4,
					"views_count": 10,
					"type": "audioBooks",
					"authors": [
						{
							"author": "А-Рина Ра",
							"slug": "29332-a-rina-ra"
						}
					],
					"genre": {
						"id": 97,
						"name": "Спорт, здоровье, красота",
						"slug": "sport-zdorove-krasota"
					}
				},
				{
					"id": 2,
					"title": "Буддийские мастера-маги. Легенды о махасиддхах",
					"genre_id": 26,
					"slug": "buddiiskie-mastera-magi-legendy-o-maxasiddxax-2",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/audiobooks\/covers\/2014\/abkhajadate-buddijjskie-mastera-magi-legendy-o-makhasiddkhakh.jpg",
					"rate_avg": 5,
					"views_count": 3,
					"type": "audioBooks",
					"authors": [
						{
							"author": "Абхаядате",
							"slug": "29333-abxayadate"
						}
					],
					"genre": {
						"id": 26,
						"name": "Разное",
						"slug": "raznoe"
					}
				},
				{
					"id": 3,
					"title": "Конец твоего мира",
					"genre_id": 27,
					"slug": "konec-tvoego-mira-3",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/audiobooks\/covers\/2013\/konec-tvoego-mira.jpg",
					"rate_avg": 0,
					"views_count": 3,
					"type": "audioBooks",
					"authors": [
						{
							"author": "Адьяшанти",
							"slug": "29334-adyasanti"
						}
					],
					"genre": {
						"id": 27,
						"name": "Эзотерика",
						"slug": "ezoterika"
					}
				},
				{
					"id": 4,
					"title": "Священная кровь",
					"genre_id": 28,
					"slug": "svyashhennaya-krov-4",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/audiobooks\/covers\/1963\/svjashhennaja-krov.jpg",
					"rate_avg": 0,
					"views_count": 1,
					"type": "audioBooks",
					"authors": [
						{
							"author": "Айбек",
							"slug": "29336-aibek"
						}
					],
					"genre": {
						"id": 28,
						"name": "Роман, проза",
						"slug": "roman-proza"
					}
				},
				{
					"id": 5,
					"title": "Тайны нашего мозга или почему умные люди делаю глупости",
					"genre_id": 29,
					"slug": "tainy-nasego-mozga-ili-pocemu-umnye-lyudi-delayu-gluposti-5",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/audiobooks\/covers\/2011\/tajjny-nashego-mozga-ili-pochemu-umnye-ljudi-delaju-gluposti.jpg",
					"rate_avg": 0,
					"views_count": 1,
					"type": "audioBooks",
					"authors": [
						{
							"author": "Сандра Аамодт",
							"slug": "29340-sandra-aamodt"
						},
						{
							"author": "Сэм Вонг",
							"slug": "29341-sem-vong"
						}
					],
					"genre": {
						"id": 29,
						"name": "Психология, философия",
						"slug": "psixologiya-filosofiya"
					}
				},
				{
					"id": 6,
					"title": "Горе человеческое - суицидальные рассказы",
					"genre_id": 28,
					"slug": "gore-celoveceskoe-suicidalnye-rasskazy-6",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/audiobooks\/covers\/2016\/gore-chelovecheskoe-suicidalnye-rasskazy.jpg",
					"rate_avg": 0,
					"views_count": 4,
					"type": "audioBooks",
					"authors": [
						{
							"author": "Татьяна Минасян",
							"slug": "17658-tatyana-minasyan"
						},
						{
							"author": "Юрий Максимов",
							"slug": "12445-yurii-maksimov"
						},
						{
							"author": "Алиска",
							"slug": "29338-aliska"
						}
					],
					"genre": {
						"id": 28,
						"name": "Роман, проза",
						"slug": "roman-proza"
					}
				}
			]
		},
		"reviews": [
			{
				"id": 38,
				"active": 1,
				"user_id": 79,
				"book_id": 10,
				"review_type_id": 1,
				"title": "Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title Title",
				"content": "Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text Text",
				"parent_review_id": null,
				"created_at": "2023-01-02T13:19:03.000000Z",
				"updated_at": "2023-01-02T13:19:03.000000Z",
				"is_liked": false,
				"views_count": 3,
				"likes_count": 0,
				"comments_count": 0,
				"user": {
					"id": 79,
					"nickname": "Madness",
					"avatar": "https:\/\/api.foxbooks.ec\/storage\/avatar\/dklNo8NihlkJ6XXz5C2XUsxJ2t2Q5NN68VdUkxfy.jpg"
				},
				"book": {
					"id": 10,
					"title": "А вы, случайно, не убийца?",
					"slug": "a-vy-sluchaino-ne-ubiitsa-13072",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2012\/13760.jpg",
					"type": "books",
					"authors": [
						{
							"id": 10,
							"author": "Никита Костылев",
							"slug": "10-nikita-kostylev"
						}
					],
					"genres": [
						{
							"id": 7,
							"name": "Детективы",
							"slug": "detektivy"
						}
					]
				}
			},
			{
				"id": 36,
				"active": 1,
				"user_id": 50,
				"book_id": 9,
				"review_type_id": 1,
				"title": "Test",
				"content": "Test1",
				"parent_review_id": null,
				"created_at": "2023-01-01T19:12:18.000000Z",
				"updated_at": "2023-01-01T19:12:18.000000Z",
				"is_liked": false,
				"views_count": 3,
				"likes_count": 2,
				"comments_count": 1,
				"user": {
					"id": 50,
					"nickname": null,
					"avatar": null
				},
				"book": {
					"id": 9,
					"title": "А время уходит",
					"slug": "a-vremia-ukhodit-59096",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2017\/62207.jpg",
					"type": "books",
					"authors": [
						{
							"id": 9,
							"author": "Мэри Хиггинс Кларк",
							"slug": "9-meri-xiggins-klark"
						}
					],
					"genres": [
						{
							"id": 6,
							"name": "Триллеры",
							"slug": "trillery"
						}
					]
				}
			},
			{
				"id": 35,
				"active": 1,
				"user_id": 79,
				"book_id": 408,
				"review_type_id": 2,
				"title": "заголовок",
				"content": "текст рецензии",
				"parent_review_id": null,
				"created_at": "2022-12-30T16:38:30.000000Z",
				"updated_at": "2022-12-30T16:38:30.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 0,
				"comments_count": 0,
				"user": {
					"id": 79,
					"nickname": "Madness",
					"avatar": "https:\/\/api.foxbooks.ec\/storage\/avatar\/dklNo8NihlkJ6XXz5C2XUsxJ2t2Q5NN68VdUkxfy.jpg"
				},
				"book": {
					"id": 408,
					"title": "Адвокат Доминанта",
					"slug": "advokat-dominanta-85993",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2020\/90519.jpg",
					"type": "books",
					"authors": [
						{
							"id": 361,
							"author": "Ольга Волкова",
							"slug": "361-olga-volkova"
						}
					],
					"genres": [
						{
							"id": 15,
							"name": "Эротика",
							"slug": "erotika"
						}
					]
				}
			},
			{
				"id": 34,
				"active": 1,
				"user_id": 79,
				"book_id": 326,
				"review_type_id": 2,
				"title": "заголовок",
				"content": "текст рецензії",
				"parent_review_id": null,
				"created_at": "2022-12-30T16:37:13.000000Z",
				"updated_at": "2022-12-30T16:37:13.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 0,
				"comments_count": 0,
				"user": {
					"id": 79,
					"nickname": "Madness",
					"avatar": "https:\/\/api.foxbooks.ec\/storage\/avatar\/dklNo8NihlkJ6XXz5C2XUsxJ2t2Q5NN68VdUkxfy.jpg"
				},
				"book": {
					"id": 326,
					"title": "Агентство постыдных услуг",
					"slug": "agentstvo-postydnykh-uslug-88706",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2021\/93375.jpg",
					"type": "books",
					"authors": [
						{
							"id": 289,
							"author": "Диана Хант",
							"slug": "289-diana-xant"
						}
					],
					"genres": [
						{
							"id": 15,
							"name": "Эротика",
							"slug": "erotika"
						}
					]
				}
			},
			{
				"id": 33,
				"active": 1,
				"user_id": 79,
				"book_id": 119473,
				"review_type_id": 3,
				"title": "Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок Заголовок",
				"content": "текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії текст рецензії",
				"parent_review_id": null,
				"created_at": "2022-12-30T16:33:38.000000Z",
				"updated_at": "2023-01-02T13:05:25.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 2,
				"comments_count": 1,
				"user": {
					"id": 79,
					"nickname": "Madness",
					"avatar": "https:\/\/api.foxbooks.ec\/storage\/avatar\/dklNo8NihlkJ6XXz5C2XUsxJ2t2Q5NN68VdUkxfy.jpg"
				},
				"book": {
					"id": 119473,
					"title": "Зайчик для Волкова",
					"slug": "zaicik-dlya-volkova",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2022\/iBNkXPFygocFTKtazu2uaNWhbQPhk5zCCuvID0Z2.jpg",
					"type": "books",
					"authors": [
						{
							"id": 39237,
							"author": "Ная Таль",
							"slug": "naya-tal"
						}
					],
					"genres": [
						{
							"id": 15,
							"name": "Эротика",
							"slug": "erotika"
						}
					]
				}
			},
			{
				"id": 31,
				"active": 1,
				"user_id": 20,
				"book_id": 14188,
				"review_type_id": 1,
				"title": "Test2",
				"content": "В шестой книге атмосфера накаляется, особенно нарастают страх и отчаяние, связанные с восхождением Волан-де-морта к былой силе и власти. Профессор Снегг вызывается помочь Ордену Феникса в борьбе с Темным Лордом. Гибнет Дамблдор и возникает множество вопросов: является ли Снегг предателем, что же будет с Гарри, Гермионой и Роном? Какую роль в судьбе Гарри сыграют его друзья и враги? Впереди - ответы на все вопросы и решающая битва. Жаль, что Гарри вырос так быстро.",
				"parent_review_id": null,
				"created_at": "2022-12-22T00:32:18.000000Z",
				"updated_at": "2022-12-22T00:32:18.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 0,
				"comments_count": 0,
				"user": {
					"id": 20,
					"nickname": null,
					"avatar": null
				},
				"book": {
					"id": 14188,
					"title": "Гарри Поттер и Принц-полукровка",
					"slug": "garri-potter-i-prints-polukrovka-2205",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2322.jpg",
					"type": "books",
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					],
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					]
				}
			},
			{
				"id": 26,
				"active": 1,
				"user_id": 54,
				"book_id": 14188,
				"review_type_id": 2,
				"title": "Жаль, что Гарри вырос так быстро.",
				"content": "В шестой книге атмосфера накаляется, особенно нарастают страх и отчаяние, связанные с восхождением Волан-де-морта к былой силе и власти. Профессор Снегг вызывается помочь Ордену Феникса в борьбе с Темным Лордом. Гибнет Дамблдор и возникает множество вопросов: является ли Снегг предателем, что же будет с Гарри, Гермионой и Роном? Какую роль в судьбе Гарри сыграют его друзья и враги? Впереди - ответы на все вопросы и решающая битва. Жаль, что Гарри вырос так быстро.",
				"parent_review_id": null,
				"created_at": "2022-12-22T00:32:18.000000Z",
				"updated_at": "2022-12-22T00:32:18.000000Z",
				"is_liked": false,
				"views_count": 1,
				"likes_count": 1,
				"comments_count": 1,
				"user": null,
				"book": {
					"id": 14188,
					"title": "Гарри Поттер и Принц-полукровка",
					"slug": "garri-potter-i-prints-polukrovka-2205",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2322.jpg",
					"type": "books",
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					],
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					]
				}
			},
			{
				"id": 32,
				"active": 1,
				"user_id": 33,
				"book_id": 14188,
				"review_type_id": 1,
				"title": "test3",
				"content": "Удивительнейшая книга из всех семи! Одни загадки и вопросы, и так мало на них ответов найдётся в этой книге: кто на стороне света, кто принадлежит тьме, почему Альбус так поступил, кто такой РАБ, кто или что сделало Волдеморта таким \"нечеловеком\", что за тайный Принц-Полукровка?! Несколько раз перечитывала и рыдала в конце, по-человечески было жаль старика(зато в седьмой просто-таки его возненавидела). Была счастлива за Гарри и новую его пассию, не могла понять Рона и Гермиону, таких подходящих друг для друга людей. Смеялась и плакала, читала, затаив дыхание и по ночам, когда нужно было спать. И до сих пор люблю эту книгу, хотя уже меньше, чем раньше. Не считаю, что мадам Ро уже исписалась, наоборот, она нагоняла страху, лишала всех простых путей, подводя читателя к заключительной и решающей черте.",
				"parent_review_id": null,
				"created_at": "2022-12-22T00:13:44.000000Z",
				"updated_at": "2022-12-22T00:13:44.000000Z",
				"is_liked": false,
				"views_count": 1,
				"likes_count": 0,
				"comments_count": 0,
				"user": {
					"id": 33,
					"nickname": null,
					"avatar": null
				},
				"book": {
					"id": 14188,
					"title": "Гарри Поттер и Принц-полукровка",
					"slug": "garri-potter-i-prints-polukrovka-2205",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2322.jpg",
					"type": "books",
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					],
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					]
				}
			},
			{
				"id": 25,
				"active": 1,
				"user_id": 76,
				"book_id": 14188,
				"review_type_id": 3,
				"title": "Удивительнейшая книга из всех семи! Одни загадки и вопросы, и так мало на них ответов найдётся в этой книге:",
				"content": "Удивительнейшая книга из всех семи! Одни загадки и вопросы, и так мало на них ответов найдётся в этой книге: кто на стороне света, кто принадлежит тьме, почему Альбус так поступил, кто такой РАБ, кто или что сделало Волдеморта таким \"нечеловеком\", что за тайный Принц-Полукровка?! Несколько раз перечитывала и рыдала в конце, по-человечески было жаль старика(зато в седьмой просто-таки его возненавидела). Была счастлива за Гарри и новую его пассию, не могла понять Рона и Гермиону, таких подходящих друг для друга людей. Смеялась и плакала, читала, затаив дыхание и по ночам, когда нужно было спать. И до сих пор люблю эту книгу, хотя уже меньше, чем раньше. Не считаю, что мадам Ро уже исписалась, наоборот, она нагоняла страху, лишала всех простых путей, подводя читателя к заключительной и решающей черте.",
				"parent_review_id": null,
				"created_at": "2022-12-22T00:13:44.000000Z",
				"updated_at": "2022-12-22T00:13:44.000000Z",
				"is_liked": false,
				"views_count": 1,
				"likes_count": 3,
				"comments_count": 1,
				"user": {
					"id": 76,
					"nickname": "Ник Миллер",
					"avatar": "https:\/\/api.foxbooks.ec\/storage\/avatar\/WbnwslqBely8zBTEORGJcocW3VhY9ciMEcAzpS0t.jpg"
				},
				"book": {
					"id": 14188,
					"title": "Гарри Поттер и Принц-полукровка",
					"slug": "garri-potter-i-prints-polukrovka-2205",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2322.jpg",
					"type": "books",
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					],
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					]
				}
			},
			{
				"id": 30,
				"active": 1,
				"user_id": 12,
				"book_id": 14188,
				"review_type_id": 1,
				"title": "Test1",
				"content": "Многие говорят, что после \"Ордена Феникса\" Роулинг окончательно исписалась. Что высасывает идеи из пальца вплоть до унизительного прибегания к законам романтической комедии. Что несостыковок в сюжетных извивах эпопеи становится всё больше и больше.\nЧушь.\n\"Когда вышел шестой том знаменитой эпопеи, очень многие люди почувствовали себя обманутыми, покинутыми и убитыми в самую душу\". Потому что ТАК женщина, подарившая миру смелого взъерошенного мальчишку со шрамом на лбу, не писала никогда раньше. Практически на соседних страницах - умиление при лицезрении попыток шестнадцатилетних подростков наладить свою личную жизнь - и леденящий ужас, вызванный ощутимым совсем близко смрадным дыханием смерти.\nГибель Альбуса Дамблдора выбила из основания и раскрошила в прах краеугольный камень всего существовавшего на тот момент магического мира. Случившаяся трагедия повлекла мгновенное очернение Северуса Снейпа в глазах всех и каждого и дала понять Гарри, что до текущего момента он не знал, что такое ненависть и желание отомстить. Неизвестно, кого теперь теряющий близких одного за другим мальчик ненавидит больше - лорда Волан-де-Морта или Принца-Полукровку.\nПоследние страницы окончательно рушат привычный уклад - в финальной части гепталогии уже не будет привычной поездки на поезде в Хогвартс, а может, и самого Хогвартса не будет... наверняка случатся новые смерти, потери, боль и слёзы.\nНо Роулинг не была бы Роулинг, если бы не оставила всем обманутым и убитым горем каплю надежды - в слезах Гермионы, пропитавших плечо Рона; в руке Тонкс, лежащей в пальцах Римуса; в заботливой ласке Флёр, которую не отпугнули жуткие шрамы Билла; в решительном взгляде Джинни в изумрудные глаза Гарри Поттера.\nСмерти нет. Есть только любовь. И седовласый волшебник, даже после смерти оставшийся могущественнейшим, прекрасно знал об этом, уходя.",
				"parent_review_id": null,
				"created_at": "2022-12-21T22:34:56.000000Z",
				"updated_at": "2022-12-21T22:34:56.000000Z",
				"is_liked": false,
				"views_count": 1,
				"likes_count": 0,
				"comments_count": 0,
				"user": {
					"id": 12,
					"nickname": null,
					"avatar": null
				},
				"book": {
					"id": 14188,
					"title": "Гарри Поттер и Принц-полукровка",
					"slug": "garri-potter-i-prints-polukrovka-2205",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2322.jpg",
					"type": "books",
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					],
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					]
				}
			},
			{
				"id": 23,
				"active": 1,
				"user_id": 28,
				"book_id": 14188,
				"review_type_id": 1,
				"title": "Принца-Полукровка и .",
				"content": "Многие говорят, что после \"Ордена Феникса\" Роулинг окончательно исписалась. Что высасывает идеи из пальца вплоть до унизительного прибегания к законам романтической комедии. Что несостыковок в сюжетных извивах эпопеи становится всё больше и больше.\nЧушь.\n\"Когда вышел шестой том знаменитой эпопеи, очень многие люди почувствовали себя обманутыми, покинутыми и убитыми в самую душу\". Потому что ТАК женщина, подарившая миру смелого взъерошенного мальчишку со шрамом на лбу, не писала никогда раньше. Практически на соседних страницах - умиление при лицезрении попыток шестнадцатилетних подростков наладить свою личную жизнь - и леденящий ужас, вызванный ощутимым совсем близко смрадным дыханием смерти.\nГибель Альбуса Дамблдора выбила из основания и раскрошила в прах краеугольный камень всего существовавшего на тот момент магического мира. Случившаяся трагедия повлекла мгновенное очернение Северуса Снейпа в глазах всех и каждого и дала понять Гарри, что до текущего момента он не знал, что такое ненависть и желание отомстить. Неизвестно, кого теперь теряющий близких одного за другим мальчик ненавидит больше - лорда Волан-де-Морта или Принца-Полукровку.\nПоследние страницы окончательно рушат привычный уклад - в финальной части гепталогии уже не будет привычной поездки на поезде в Хогвартс, а может, и самого Хогвартса не будет... наверняка случатся новые смерти, потери, боль и слёзы.\nНо Роулинг не была бы Роулинг, если бы не оставила всем обманутым и убитым горем каплю надежды - в слезах Гермионы, пропитавших плечо Рона; в руке Тонкс, лежащей в пальцах Римуса; в заботливой ласке Флёр, которую не отпугнули жуткие шрамы Билла; в решительном взгляде Джинни в изумрудные глаза Гарри Поттера.\nСмерти нет. Есть только любовь. И седовласый волшебник, даже после смерти оставшийся могущественнейшим, прекрасно знал об этом, уходя.",
				"parent_review_id": null,
				"created_at": "2022-12-21T22:34:56.000000Z",
				"updated_at": "2022-12-21T22:34:56.000000Z",
				"is_liked": false,
				"views_count": 1,
				"likes_count": 1,
				"comments_count": 2,
				"user": {
					"id": 28,
					"nickname": "Алена",
					"avatar": "https:\/\/api.foxbooks.ec\/storage\/avatar\/Rtn7drxPFo6Smhu2XwzMSXPbGoPY8iolxGQCZMz4.jpg"
				},
				"book": {
					"id": 14188,
					"title": "Гарри Поттер и Принц-полукровка",
					"slug": "garri-potter-i-prints-polukrovka-2205",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2322.jpg",
					"type": "books",
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					],
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					]
				}
			},
			{
				"id": 22,
				"active": 1,
				"user_id": 28,
				"book_id": 14190,
				"review_type_id": 1,
				"title": "\"Гарри Поттер и узник Азкабана\"- самая лучшая из всех книг о Гарри Поттере.",
				"content": "Тест: Абсолютно вся поттериана является моей любимой франшизой. Все 7 книг про мальчика-волшебника унесут их читателя в незабываемое путешествие по волшебному миру. Я сам провел за ними не один год. Каждая книга хороша собою, имеет свои отличительные достоинства и персональные недостатки. Но лично я хотел бы выделить именно 3 книгу серии.\n\"Гарри Поттер и узник Азкабана\" является самой любимой моей книгой в серии. В ней появляются одни их моих (и не только моих) любимых персонажей, к примеру Римус Люпин. Последние книги отличаются своей серьезностью, а самые первые слегка детские (чисто мое мнение). В третьей же книге я чувствую дух той самой юности, ту самую золотую середину. за это я и люблю \"Узника\".",
				"parent_review_id": null,
				"created_at": "2022-12-04T15:34:21.000000Z",
				"updated_at": "2022-12-04T15:34:21.000000Z",
				"is_liked": false,
				"views_count": 1,
				"likes_count": 1,
				"comments_count": 0,
				"user": {
					"id": 28,
					"nickname": "Алена",
					"avatar": "https:\/\/api.foxbooks.ec\/storage\/avatar\/Rtn7drxPFo6Smhu2XwzMSXPbGoPY8iolxGQCZMz4.jpg"
				},
				"book": {
					"id": 14190,
					"title": "Гарри Поттер и узник Азкабана",
					"slug": "garri-potter-i-uznik-azkabana-2203",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2319.jpg",
					"type": "books",
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					],
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					]
				}
			},
			{
				"id": 19,
				"active": 1,
				"user_id": 28,
				"book_id": 30235,
				"review_type_id": 1,
				"title": "Красавец и авантюрист Альто",
				"content": "Красавец и авантюрист Альто, которого я люблю, женится на другой. Вот только он делает это не по своей воле, а из -за внушённой любви. Его будущая супруга, Лорена Флори, много лет влюбляла в себя мужчин, не спрашивая их согласия, и меняла фаворитов, не церемонясь с теми, кто ей не надоел. Но Альто она отпускать не собирается. Лорена не откажется от лакомой добычи - а меня, свою соперницу, она отправляет за решётку. Но если она празднует победу, то зря. Даже в тюрьме я не предам свои чувства. И что -то мне подсказывает, что Альто не сдастся тоже. Ведь он не мог забыть свои чувства ко мне, правда? В нашей библиотеке вы можете бесплатно почитать книгу « Поцелуй истинной невесты ». Чтобы читать онлайн книгу « Поцелуй истинной невесты » перейдите по указанной ссылке. Приятного Вам чтения.",
				"parent_review_id": null,
				"created_at": "2022-08-02T20:09:16.000000Z",
				"updated_at": "2022-08-02T20:09:16.000000Z",
				"is_liked": false,
				"views_count": 2,
				"likes_count": 0,
				"comments_count": 2,
				"user": {
					"id": 28,
					"nickname": "Алена",
					"avatar": "https:\/\/api.foxbooks.ec\/storage\/avatar\/Rtn7drxPFo6Smhu2XwzMSXPbGoPY8iolxGQCZMz4.jpg"
				},
				"book": {
					"id": 30235,
					"title": "Избранница Тёмного Лорда",
					"slug": "izbrannitsa-tiomnogo-lorda-86071",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2020\/90602.jpg",
					"type": "books",
					"authors": [
						{
							"id": 9564,
							"author": "Ольга Силаева",
							"slug": "9564-olga-silaeva"
						}
					],
					"genres": [
						{
							"id": 15,
							"name": "Эротика",
							"slug": "erotika"
						}
					]
				}
			},
			{
				"id": 18,
				"active": 1,
				"user_id": 28,
				"book_id": 114830,
				"review_type_id": 1,
				"title": "тест Рецензии",
				"content": "тест рецензии Положительная",
				"parent_review_id": null,
				"created_at": "2022-08-02T19:57:44.000000Z",
				"updated_at": "2022-08-02T19:57:44.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 1,
				"comments_count": 3,
				"user": {
					"id": 28,
					"nickname": "Алена",
					"avatar": "https:\/\/api.foxbooks.ec\/storage\/avatar\/Rtn7drxPFo6Smhu2XwzMSXPbGoPY8iolxGQCZMz4.jpg"
				},
				"book": {
					"id": 114830,
					"title": "Поцелуй истинной невесты",
					"slug": "potselui-istinnoi-nevesty-99757",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2022\/105008.jpg",
					"type": "books",
					"authors": [
						{
							"id": 9564,
							"author": "Ольга Силаева",
							"slug": "9564-olga-silaeva"
						}
					],
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					]
				}
			},
			{
				"id": 16,
				"active": 1,
				"user_id": 28,
				"book_id": 14191,
				"review_type_id": 2,
				"title": "Рецензия",
				"content": "Узник Азкабана лучше! 100%",
				"parent_review_id": null,
				"created_at": "2022-06-21T13:00:26.000000Z",
				"updated_at": "2022-12-04T14:32:44.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 1,
				"comments_count": 3,
				"user": {
					"id": 28,
					"nickname": "Алена",
					"avatar": "https:\/\/api.foxbooks.ec\/storage\/avatar\/Rtn7drxPFo6Smhu2XwzMSXPbGoPY8iolxGQCZMz4.jpg"
				},
				"book": {
					"id": 14191,
					"title": "Гарри Поттер и философский камень",
					"slug": "garri-potter-i-filosofskii-kamen-2201",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2007\/2317.jpg",
					"type": "books",
					"authors": [
						{
							"id": 6775,
							"author": "Джоан Кэтлин Роулинг",
							"slug": "6775-dzoan-ketlin-roling"
						}
					],
					"genres": [
						{
							"id": 14,
							"name": "Фэнтези",
							"slug": "fentezi"
						}
					]
				}
			},
			{
				"id": 12,
				"active": 1,
				"user_id": 9,
				"book_id": 29,
				"review_type_id": 1,
				"title": "тест6",
				"content": "Lorem ipsum dolor sit amet",
				"parent_review_id": null,
				"created_at": "2022-06-06T21:58:18.000000Z",
				"updated_at": "2022-06-06T21:58:18.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 0,
				"comments_count": 0,
				"user": null,
				"book": {
					"id": 29,
					"title": "А ларчик просто открывался",
					"slug": "a-larchik-prosto-otkryvalsia-61427",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2002\/64660.jpg",
					"type": "books",
					"authors": [
						{
							"id": 28,
							"author": "Фиона Келли",
							"slug": "28-fiona-kelli"
						}
					],
					"genres": [
						{
							"id": 13,
							"name": "Детская проза",
							"slug": "detskaya-proza"
						}
					]
				}
			},
			{
				"id": 10,
				"active": 1,
				"user_id": 7,
				"book_id": 29,
				"review_type_id": 2,
				"title": "тест4",
				"content": "Lorem ipsum dolor sit amet",
				"parent_review_id": null,
				"created_at": "2022-06-06T21:58:15.000000Z",
				"updated_at": "2022-06-06T21:58:15.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 1,
				"comments_count": 4,
				"user": {
					"id": 7,
					"nickname": null,
					"avatar": null
				},
				"book": {
					"id": 29,
					"title": "А ларчик просто открывался",
					"slug": "a-larchik-prosto-otkryvalsia-61427",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2002\/64660.jpg",
					"type": "books",
					"authors": [
						{
							"id": 28,
							"author": "Фиона Келли",
							"slug": "28-fiona-kelli"
						}
					],
					"genres": [
						{
							"id": 13,
							"name": "Детская проза",
							"slug": "detskaya-proza"
						}
					]
				}
			},
			{
				"id": 9,
				"active": 1,
				"user_id": 6,
				"book_id": 29,
				"review_type_id": 1,
				"title": "тест3",
				"content": "Lorem ipsum dolor sit amet",
				"parent_review_id": null,
				"created_at": "2022-06-06T21:58:15.000000Z",
				"updated_at": "2022-06-06T21:58:15.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 1,
				"comments_count": 0,
				"user": {
					"id": 6,
					"nickname": null,
					"avatar": null
				},
				"book": {
					"id": 29,
					"title": "А ларчик просто открывался",
					"slug": "a-larchik-prosto-otkryvalsia-61427",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2002\/64660.jpg",
					"type": "books",
					"authors": [
						{
							"id": 28,
							"author": "Фиона Келли",
							"slug": "28-fiona-kelli"
						}
					],
					"genres": [
						{
							"id": 13,
							"name": "Детская проза",
							"slug": "detskaya-proza"
						}
					]
				}
			},
			{
				"id": 8,
				"active": 1,
				"user_id": 5,
				"book_id": 29,
				"review_type_id": 1,
				"title": "тест2",
				"content": "Lorem ipsum dolor sit amet",
				"parent_review_id": null,
				"created_at": "2022-06-06T21:58:15.000000Z",
				"updated_at": "2022-06-06T21:58:15.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 0,
				"comments_count": 0,
				"user": {
					"id": 5,
					"nickname": null,
					"avatar": null
				},
				"book": {
					"id": 29,
					"title": "А ларчик просто открывался",
					"slug": "a-larchik-prosto-otkryvalsia-61427",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2002\/64660.jpg",
					"type": "books",
					"authors": [
						{
							"id": 28,
							"author": "Фиона Келли",
							"slug": "28-fiona-kelli"
						}
					],
					"genres": [
						{
							"id": 13,
							"name": "Детская проза",
							"slug": "detskaya-proza"
						}
					]
				}
			},
			{
				"id": 7,
				"active": 1,
				"user_id": 16,
				"book_id": 29,
				"review_type_id": 2,
				"title": "тест1",
				"content": "Lorem ipsum dolor sit amet",
				"parent_review_id": null,
				"created_at": "2022-06-06T21:58:15.000000Z",
				"updated_at": "2022-06-06T21:58:15.000000Z",
				"is_liked": false,
				"views_count": 0,
				"likes_count": 1,
				"comments_count": 3,
				"user": {
					"id": 16,
					"nickname": "sssdsd234asd3",
					"avatar": null
				},
				"book": {
					"id": 29,
					"title": "А ларчик просто открывался",
					"slug": "a-larchik-prosto-otkryvalsia-61427",
					"cover_url": "https:\/\/api.foxbooks.ec\/storage\/books\/covers\/2002\/64660.jpg",
					"type": "books",
					"authors": [
						{
							"id": 28,
							"author": "Фиона Келли",
							"slug": "28-fiona-kelli"
						}
					],
					"genres": [
						{
							"id": 13,
							"name": "Детская проза",
							"slug": "detskaya-proza"
						}
					]
				}
			}
		]
}

const order = [
	{
		"title": "Последние поступления",
		"value": 1
	},
	{
		"title": "Популярные",
		"value": 3
	},
	{
		"title": "Бестселлеры",
		"value": 5
	},
	{
		"title": "Сейчас читают",
		"value": 2
	}
]
const HomeView = (/*{audioBooks, newBooks, order}*/) => {
	const hotUpdates = useRef();
	const {query} = useRouter();

	const {innerWidthWindow} = useSelector(state => state.common);

	const [firstVisit, setFirstVisit] = useState(true);

	useEffect(() => {
		if (Object.keys(query).length !== 0 && !firstVisit) {
			window.scrollTo({
				top: hotUpdates.current.offsetTop - 10,
				left: 0,
				// behavior: "smooth",
			});
		}
		setFirstVisit(false)
	}, [query]);

	return (
		<div className={classNames('container', css.container)}>
			<div className={css.mainContainer}>
				<Categories test={response.genres}/>
				<div className={css.mainBlock}>
					<Alphabet/>
					<ShowAll
						title={innerWidthWindow >= 768 ? 'Новинки книг' : 'Новинки'}
						url={`/new`}
					/>

					<Swiper
						modules={[Navigation]}
						spaceBetween={innerWidthWindow <= 768 ? 10 : 24}
						slidesPerView={innerWidthWindow <= 480 ? 3 : 5}
						navigation={{
							prevEl: '.prevArrow',
							nextEl: '.nextArrow',
						}}
					>
						{response.newBooksCompilations.books.map(book => (
							<SwiperSlide key={book?.id} className={cssBook.swiperSlide}>
								<Book
									book={book}
									type={book?.type}
								/>
							</SwiperSlide>
						))}
						<button className="prevArrow">
							<ArrowRight className="arrowNext"/>
						</button>
						<button className="nextArrow">
							<ArrowRight className="arrowNext"/>
						</button>
					</Swiper>
				</div>
			</div>
			{/*{innerWidthWindow <= 768 && <MobileBlock />}*/}
			<Hero/>
			<div ref={hotUpdates} className={css.wrapper}>
				<BookUpdates/>
				<Filters testBooks={response.mainPageBookFilter} testCategories={response.genres} order={order}/>
			</div>
			<Introductory audioBooks={response.audioBooksList.audio_books} test={response.compilations}/>
			<About/>
		</div>
	);
};
export default HomeView;
