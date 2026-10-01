export interface HttpCode {
  code: number;
  title: string;
  family: '1xx' | '2xx' | '3xx' | '4xx' | '5xx';
  familyName: string;
  tagline: string;
  oneLiner: string;
  scenario: string;
  realWorldExample: string;
  catUrl: string;
  catAlt: string;
  resolution: string;
  simulatedRequest: {
    method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
    url: string;
    headers: Record<string, string>;
    body?: string;
  };
  simulatedResponse: {
    statusText: string;
    timeMs: number;
    headers: Record<string, string>;
    body: any;
  };
}

export const HTTP_FAMILIES = [
  {
    family: 'all',
    name: 'All Codes',
    description: 'Explore the full spectrum of HTTP status cats',
    badgeClass: 'text-slate-300',
    color: '#94a3b8'
  },
  {
    family: '1xx',
    name: '1xx Informational',
    description: 'Hold on! The server received the request headers and is ready for the body.',
    badgeClass: 'text-sky-400',
    color: '#38bdf8'
  },
  {
    family: '2xx',
    name: '2xx Success',
    description: 'Woohoo! The action requested by the client was received, understood, and accepted.',
    badgeClass: 'text-emerald-400',
    color: '#34d399'
  },
  {
    family: '3xx',
    name: '3xx Redirection',
    description: 'Look over here! Further action needs to be taken by the user agent to fulfill the request.',
    badgeClass: 'text-amber-400',
    color: '#fbbf24'
  },
  {
    family: '4xx',
    name: '4xx Client Error',
    description: 'Your fault! The client seems to have erred (bad URL, wrong password, missing fields).',
    badgeClass: 'text-rose-400',
    color: '#f87171'
  },
  {
    family: '5xx',
    name: '5xx Server Error',
    description: 'Server fault! The server failed to fulfill an apparently valid request.',
    badgeClass: 'text-purple-400',
    color: '#c084fc'
  }
];

export const HTTP_CODES: HttpCode[] = [
  // 1xx
  {
    code: 100,
    title: 'Continue',
    family: '1xx',
    familyName: 'Informational',
    tagline: 'Keep going, I hear you!',
    oneLiner: 'The server received the initial headers and tells the client to proceed sending the rest of the request body.',
    scenario: 'You are uploading a huge 5GB video file. Your browser asks first: "Can I send this large file?" The server checks size limits and says 100 Continue.',
    realWorldExample: 'Large file upload with Expect: 100-continue header before transmitting gigabytes over 4G.',
    catUrl: 'https://http.cat/100',
    catAlt: 'Curious cat peering closely, ready for more instructions',
    resolution: 'The client should proceed with sending the remainder of the HTTP request payload.',
    simulatedRequest: {
      method: 'POST',
      url: 'https://api.streamcat.tv/v1/videos/upload',
      headers: {
        'Content-Type': 'video/mp4',
        'Expect': '100-continue',
        'Content-Length': '524288000'
      }
    },
    simulatedResponse: {
      statusText: 'Continue',
      timeMs: 38,
      headers: {
        'date': 'Thu, 01 Oct 2026 08:00:00 GMT'
      },
      body: {
        message: 'Headers accepted. Please stream video bytes now.'
      }
    }
  },
  {
    code: 101,
    title: 'Switching Protocols',
    family: '1xx',
    familyName: 'Informational',
    tagline: 'Upgrading the phone line to a live tunnel!',
    oneLiner: 'The requester asked the server to switch protocols (like moving from standard HTTP to a live WebSocket connection), and the server agreed.',
    scenario: 'You opened a live multiplayer cat game or Discord chat. Your browser asks to upgrade the standard HTTP request into a persistent two-way WebSocket.',
    realWorldExample: 'Connecting to a live crypto price ticker or multiplayer game via WebSocket (ws:// or wss://).',
    catUrl: 'https://http.cat/101',
    catAlt: 'Cat transforming through a laser tunnel',
    resolution: 'The client should now speak the new protocol (e.g. WebSocket frames instead of HTTP messages).',
    simulatedRequest: {
      method: 'GET',
      url: 'https://api.livechat.io/ws/v2/room/kittens',
      headers: {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade',
        'Sec-WebSocket-Key': 'dGhlIHNhbXBsZSBub25jZQ=='
      }
    },
    simulatedResponse: {
      statusText: 'Switching Protocols',
      timeMs: 14,
      headers: {
        'Upgrade': 'websocket',
        'Connection': 'Upgrade',
        'Sec-WebSocket-Accept': 's3pPLMBiTxaQ9kYGzzhZRbK+xOo='
      },
      body: {
        protocol: 'websocket',
        status: 'connection_upgraded'
      }
    }
  },

  // 2xx
  {
    code: 200,
    title: 'OK',
    family: '2xx',
    familyName: 'Success',
    tagline: 'Purrfect! Everything went exactly as planned.',
    oneLiner: 'Standard response for successful HTTP requests. The server found what you asked for and sent it back.',
    scenario: 'You opened your Spotify playlist or visited a user profile. The backend found the songs, packed them into JSON, and delivered them to your screen.',
    realWorldExample: 'Fetching the homepage, searching for products, or loading articles.',
    catUrl: 'https://http.cat/200',
    catAlt: 'Content, happy cat resting peacefully',
    resolution: 'Success! Parse the returned JSON or HTML and display it to the user.',
    simulatedRequest: {
      method: 'GET',
      url: 'https://api.petstore.com/v1/cats/whiskers',
      headers: {
        'Accept': 'application/json',
        'Authorization': 'Bearer cat_token_9824'
      }
    },
    simulatedResponse: {
      statusText: 'OK',
      timeMs: 42,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        'cache-control': 'max-age=3600'
      },
      body: {
        id: 'cat_9824',
        name: 'Whiskers',
        favoriteSnack: 'Fresh Salmon',
        napHoursPerDay: 16.5,
        purrVolumeDb: 42,
        status: 'happy'
      }
    }
  },
  {
    code: 201,
    title: 'Created',
    family: '2xx',
    familyName: 'Success',
    tagline: 'Brand new life brought into the database!',
    oneLiner: 'The request succeeded and a new resource was created on the server as a result.',
    scenario: 'You filled out a sign-up form with your email and password and clicked "Create Account". A new user row is saved in PostgreSQL and your user ID is returned.',
    realWorldExample: 'Submitting a POST request to add a new product to an e-commerce catalog or uploading a new blog post.',
    catUrl: 'https://http.cat/201',
    catAlt: 'Proud mother cat with tiny newborn kittens',
    resolution: 'The client receives the newly created resource and its URL / ID to navigate to.',
    simulatedRequest: {
      method: 'POST',
      url: 'https://api.catgram.com/v1/posts',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer auth_user_771'
      },
      body: JSON.stringify({
        caption: 'Found a sunbeam on the carpet! ✨',
        imageUrl: 'https://http.cat/201',
        tags: ['sunshine', 'naptime']
      }, null, 2)
    },
    simulatedResponse: {
      statusText: 'Created',
      timeMs: 65,
      headers: {
        'content-type': 'application/json',
        'location': '/v1/posts/post_883201'
      },
      body: {
        postId: 'post_883201',
        createdAt: '2026-10-01T08:14:00Z',
        likesCount: 0,
        status: 'published'
      }
    }
  },
  {
    code: 202,
    title: 'Accepted',
    family: '2xx',
    familyName: 'Success',
    tagline: 'Got your ticket, working in the background!',
    oneLiner: 'The request has been accepted for processing, but the processing has not been completed yet.',
    scenario: 'You clicked "Export all order history to CSV for 2025". Generating 100,000 rows takes 2 minutes, so the server queues the job and gives you a tracking ID.',
    realWorldExample: 'Starting video transcoding, large PDF reports generation, or triggering an asynchronous cloud backup.',
    catUrl: 'https://http.cat/202',
    catAlt: 'Cat working a busy office desk with a queued ticket',
    resolution: 'Store the job ID and poll the status endpoint or wait for a webhook notification.',
    simulatedRequest: {
      method: 'POST',
      url: 'https://api.analytics.com/v1/reports/annual-csv',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ year: 2025, format: 'zip' }, null, 2)
    },
    simulatedResponse: {
      statusText: 'Accepted',
      timeMs: 50,
      headers: {
        'content-type': 'application/json',
        'retry-after': '30'
      },
      body: {
        jobId: 'job_queue_99812',
        status: 'queued',
        estimatedSeconds: 45,
        pollUrl: '/v1/reports/status/job_queue_99812'
      }
    }
  },
  {
    code: 204,
    title: 'No Content',
    family: '2xx',
    familyName: 'Success',
    tagline: 'Done! Nothing left to say.',
    oneLiner: 'The server successfully processed the request, but is not returning any content in the response body.',
    scenario: 'You clicked the trash icon on a tweet to delete it. The tweet is removed from the database, and the server returns an empty 204 body to confirm deletion.',
    realWorldExample: 'DELETE requests, saving draft auto-saves, or clicking "Like" / "Unlike" toggles.',
    catUrl: 'https://http.cat/204',
    catAlt: 'Cat staring into an empty bowl with nothing inside',
    resolution: 'Update the user interface to remove the deleted item or reflect the state change without parsing JSON.',
    simulatedRequest: {
      method: 'DELETE',
      url: 'https://api.todos.com/v1/tasks/task_404',
      headers: {
        'Authorization': 'Bearer user_token_99'
      }
    },
    simulatedResponse: {
      statusText: 'No Content',
      timeMs: 28,
      headers: {
        'content-length': '0',
        'date': 'Thu, 01 Oct 2026 08:14:05 GMT'
      },
      body: null
    }
  },

  // 3xx
  {
    code: 301,
    title: 'Moved Permanently',
    family: '3xx',
    familyName: 'Redirection',
    tagline: 'We packed our boxes and moved to a new house forever!',
    oneLiner: 'The requested resource has been assigned a new permanent URI; browsers automatically update bookmarks and search engines update indices.',
    scenario: 'A company rebranded from `mycatfood.com` to `felinedelights.com`. Any user typing the old URL gets forwarded to the new one with 301.',
    realWorldExample: 'Migrating from HTTP to HTTPS (`http://example.com` -> `https://example.com`) or domain name changes.',
    catUrl: 'https://http.cat/301',
    catAlt: 'Cat sitting inside a cardboard moving box',
    resolution: 'The browser automatically follows the Location header. Update bookmarks and permanent links.',
    simulatedRequest: {
      method: 'GET',
      url: 'http://petblog.com/top-10-cat-treats',
      headers: {
        'User-Agent': 'Mozilla/5.0 Chrome/120'
      }
    },
    simulatedResponse: {
      statusText: 'Moved Permanently',
      timeMs: 18,
      headers: {
        'location': 'https://petblog.com/top-10-cat-treats',
        'cache-control': 'public, max-age=31536000'
      },
      body: {
        message: 'Resource permanently moved to secure HTTPS origin.'
      }
    }
  },
  {
    code: 304,
    title: 'Not Modified',
    family: '3xx',
    familyName: 'Redirection',
    tagline: 'Nothing changed! Use what you already have in your stash.',
    oneLiner: 'Tells the client that the response has not been modified since the last check, so the client can reuse its cached version to save bandwidth.',
    scenario: 'You refreshed a webpage you visited 5 minutes ago. Your browser asks: "Did the cat avatar change since 2pm?" The server replies 304 Not Modified.',
    realWorldExample: 'Browser conditional requests sending `If-None-Match: "etag123"` or `If-Modified-Since`.',
    catUrl: 'https://http.cat/304',
    catAlt: 'Cat inspecting identical copies of toy mice',
    resolution: 'Browser serves the file instantly from local disk memory cache without downloading duplicate bytes.',
    simulatedRequest: {
      method: 'GET',
      url: 'https://cdn.cats.org/assets/logo.png',
      headers: {
        'If-None-Match': 'W/"77a-18f1a8b29"',
        'If-Modified-Since': 'Wed, 21 Jan 2026 10:00:00 GMT'
      }
    },
    simulatedResponse: {
      statusText: 'Not Modified',
      timeMs: 12,
      headers: {
        'etag': 'W/"77a-18f1a8b29"',
        'cache-control': 'public, max-age=86400'
      },
      body: null
    }
  },
  {
    code: 307,
    title: 'Temporary Redirect',
    family: '3xx',
    familyName: 'Redirection',
    tagline: 'Go over there just for today, but keep my address!',
    oneLiner: 'The target resource resides temporarily under a different URI, but future requests should still use the original URI.',
    scenario: 'A server region in London is down for routine maintenance, so traffic is temporarily redirected to the Frankfurt data center.',
    realWorldExample: 'Maintenance window redirects, short-lived promotional links, or A/B testing splits.',
    catUrl: 'https://http.cat/307',
    catAlt: 'Cat pointing a paw to a temporary detour detour sign',
    resolution: 'The client follows the Location header for this specific request, but remembers original URL for next time.',
    simulatedRequest: {
      method: 'GET',
      url: 'https://api.catbank.com/v1/dashboard',
      headers: {
        'Authorization': 'Bearer sess_temp_123'
      }
    },
    simulatedResponse: {
      statusText: 'Temporary Redirect',
      timeMs: 25,
      headers: {
        'location': 'https://maintenance.catbank.com/read-only-dashboard'
      },
      body: {
        message: 'Redirecting to maintenance mirror.'
      }
    }
  },

  // 4xx
  {
    code: 400,
    title: 'Bad Request',
    family: '4xx',
    familyName: 'Client Error',
    tagline: 'I can’t understand your gibberish!',
    oneLiner: 'The server cannot or will not process the request due to something perceived to be a client error (e.g. malformed syntax, invalid JSON, or missing required parameters).',
    scenario: 'You submitted a sign-up form with an email written as `cat@@invalid..com` or sent corrupted JSON with missing curly brackets.',
    realWorldExample: 'Schema validation failures in an API, such as passing a string where an integer was required (`age: "fluffy"`).',
    catUrl: 'https://http.cat/400',
    catAlt: 'Confused cat tilting head at bizarre unreadable text',
    resolution: 'Fix the request syntax, ensure valid JSON format, and check input validation rules before resending.',
    simulatedRequest: {
      method: 'POST',
      url: 'https://api.petshop.com/v1/checkout',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '{ "amount": -50, "currency": "CATNIP" }'
    },
    simulatedResponse: {
      statusText: 'Bad Request',
      timeMs: 31,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        error: 'ValidationError',
        message: 'Field "amount" must be positive. "currency" CATNIP is not supported.',
        invalidFields: ['amount', 'currency']
      }
    }
  },
  {
    code: 401,
    title: 'Unauthorized',
    family: '4xx',
    familyName: 'Client Error',
    tagline: 'Who are you? Show me your badge first!',
    oneLiner: 'The request has not been applied because it lacks valid authentication credentials for the target resource.',
    scenario: 'You tried to fetch your private banking statement without logging in first, or your Bearer JWT token expired 10 minutes ago.',
    realWorldExample: 'Calling an API without the `Authorization: Bearer <token>` header, or with an invalid API key.',
    catUrl: 'https://http.cat/401',
    catAlt: 'Bouncer cat guarding the door demanding identification',
    resolution: 'Prompt the user to log in or refresh their access token, then retry with the new credentials.',
    simulatedRequest: {
      method: 'GET',
      url: 'https://api.catvault.com/v1/my-passwords',
      headers: {
        'Accept': 'application/json'
      }
    },
    simulatedResponse: {
      statusText: 'Unauthorized',
      timeMs: 19,
      headers: {
        'www-authenticate': 'Bearer realm="CatVaultAPI", error="invalid_token"',
        'content-type': 'application/json'
      },
      body: {
        error: 'AuthenticationRequired',
        message: 'Missing or expired Bearer token in Authorization header.'
      }
    }
  },
  {
    code: 403,
    title: 'Forbidden',
    family: '4xx',
    familyName: 'Client Error',
    tagline: 'I know who you are, but you are NOT allowed in here!',
    oneLiner: 'The server understands the request and your identity, but refuses to authorize it because you lack permissions.',
    scenario: 'You are logged in as a regular viewer on YouTube, but you try to send an API request to delete the creator’s channel.',
    realWorldExample: 'Role-Based Access Control (RBAC) rejection: a standard user trying to call `/api/admin/purge-database`.',
    catUrl: 'https://http.cat/403',
    catAlt: 'Stern cat holding paw up saying NO ENTRY',
    resolution: 'Check user permissions or contact an administrator to request elevated role privileges.',
    simulatedRequest: {
      method: 'DELETE',
      url: 'https://api.company.com/v1/admin/users/all',
      headers: {
        'Authorization': 'Bearer user_role_intern_123'
      }
    },
    simulatedResponse: {
      statusText: 'Forbidden',
      timeMs: 24,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        error: 'AccessDenied',
        message: 'User role "intern" lacks permission "SUPERADMIN_PURGE".'
      }
    }
  },
  {
    code: 404,
    title: 'Not Found',
    family: '4xx',
    familyName: 'Client Error',
    tagline: 'I searched everywhere under the sofa, it’s not here!',
    oneLiner: 'The server can communicate, but cannot find what was requested at that endpoint or resource identifier.',
    scenario: 'You clicked a broken link or made a typo in the URL: `https://api.github.com/users/thiss-cat-does-not-exist-999`. The server looked in the database, found 0 results, and gave you a 404.',
    realWorldExample: 'Mistyped API endpoints, deleted posts, or querying an ID that doesn’t exist.',
    catUrl: 'https://http.cat/404',
    catAlt: 'Cat with head buried inside cardboard box searching in vain',
    resolution: 'Verify the URL path, check if the resource was deleted, or provide a friendly "Page Not Found" screen.',
    simulatedRequest: {
      method: 'GET',
      url: 'https://api.catadoption.org/v1/kittens/nonexistent-id-999',
      headers: {
        'Accept': 'application/json'
      }
    },
    simulatedResponse: {
      statusText: 'Not Found',
      timeMs: 36,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        error: 'ResourceNotFound',
        message: 'No kitten found with identifier nonexistent-id-999.'
      }
    }
  },
  {
    code: 405,
    title: 'Method Not Allowed',
    family: '4xx',
    familyName: 'Client Error',
    tagline: 'You cannot do THAT action here!',
    oneLiner: 'The request method (GET, POST, PUT, DELETE) is known by the server but not supported by the target resource.',
    scenario: 'You tried to send a `DELETE` request to a read-only endpoint like `DELETE /api/v1/countries`. The server allows GET, but forbids DELETE.',
    realWorldExample: 'Sending a POST request to a static file or GET-only analytics view.',
    catUrl: 'https://http.cat/405',
    catAlt: 'Cat rejecting a dog bone with disdain',
    resolution: 'Inspect the "Allow" header returned by the server to see which HTTP methods are permitted.',
    simulatedRequest: {
      method: 'POST',
      url: 'https://api.weather.com/v1/today',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ makeItRain: true })
    },
    simulatedResponse: {
      statusText: 'Method Not Allowed',
      timeMs: 22,
      headers: {
        'allow': 'GET, HEAD, OPTIONS',
        'content-type': 'application/json'
      },
      body: {
        error: 'MethodNotAllowed',
        message: 'POST is not supported for weather observation feeds. Allowed: GET.'
      }
    }
  },
  {
    code: 408,
    title: 'Request Timeout',
    family: '4xx',
    familyName: 'Client Error',
    tagline: 'I fell asleep waiting for you to finish talking!',
    oneLiner: 'The server timed out waiting for the request from the client.',
    scenario: 'Your phone lost cellular signal right in the middle of sending an HTTP request. The server waited 30 seconds for the rest of the bytes, gave up, and hung up.',
    realWorldExample: 'Slow mobile network connections, stalled uploads, or socket idle timeouts.',
    catUrl: 'https://http.cat/408',
    catAlt: 'Cat fast asleep on a computer keyboard waiting for input',
    resolution: 'The client may repeat the request without modifications when the network reconnects.',
    simulatedRequest: {
      method: 'POST',
      url: 'https://api.cloudcat.io/v1/sync',
      headers: {
        'Content-Type': 'application/json'
      },
      body: '...[connection stalled halfway]...'
    },
    simulatedResponse: {
      statusText: 'Request Timeout',
      timeMs: 15000,
      headers: {
        'connection': 'close',
        'content-type': 'application/json'
      },
      body: {
        error: 'ClientTimeout',
        message: 'Client did not finish sending request within the 15-second server timeout limit.'
      }
    }
  },
  {
    code: 409,
    title: 'Conflict',
    family: '4xx',
    familyName: 'Client Error',
    tagline: 'Two cats fighting over the exact same spot!',
    oneLiner: 'The request could not be completed due to a conflict with the current state of the target resource.',
    scenario: 'Two people tried to register the username `@fluffy_kitty` at the exact same fraction of a second. One won, and the second got a 409 Conflict.',
    realWorldExample: 'Git merge conflicts, creating an existing unique key in a database, or editing an outdated version of a wiki page.',
    catUrl: 'https://http.cat/409',
    catAlt: 'Two cats angrily batting paws at each other',
    resolution: 'Fetch the latest state of the resource, resolve the collision, and try again with updated identifiers.',
    simulatedRequest: {
      method: 'POST',
      url: 'https://api.github.com/orgs/cats/repos',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ name: 'meow-app' })
    },
    simulatedResponse: {
      statusText: 'Conflict',
      timeMs: 44,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        error: 'RepositoryNameCollision',
        message: 'A repository named "meow-app" already exists in this organization.'
      }
    }
  },
  {
    code: 418,
    title: "I'm a teapot",
    family: '4xx',
    familyName: 'Client Error',
    tagline: 'Short and stout! Coffee brewing not supported.',
    oneLiner: 'An April Fools’ joke from 1998 (RFC 2324 Hyper Text Coffee Pot Control Protocol). Any attempt to brew coffee with a teapot should result in error 418.',
    scenario: 'You send a request to a smart IoT kettle asking it to brew espresso: `BREW /coffee`. The teapot proudly replies that it is a teapot and cannot brew coffee.',
    realWorldExample: 'Beloved developer easter egg implemented in Nginx, Google search easter egg, and APIs worldwide.',
    catUrl: 'https://http.cat/418',
    catAlt: 'Cat comfortably stuffed inside an antique teapot',
    resolution: 'Use a designated coffee maker instead of trying to brew espresso in a delicate porcelain teapot.',
    simulatedRequest: {
      method: 'POST',
      url: 'https://iot.smartkitchen.com/v1/kettle/brew',
      headers: {
        'Content-Type': 'application/coffee-pot-command'
      },
      body: 'BREW coffee --strength=double'
    },
    simulatedResponse: {
      statusText: "I'm a teapot",
      timeMs: 16,
      headers: {
        'x-rfc-standard': 'RFC 2324 / RFC 7168',
        'content-type': 'application/json'
      },
      body: {
        status: 418,
        message: "I am a teapot. I cannot brew coffee. Would you care for some chamomile tea instead?",
        device: 'Porcelain_Kettle_MK4'
      }
    }
  },
  {
    code: 422,
    title: 'Unprocessable Content',
    family: '4xx',
    familyName: 'Client Error',
    tagline: 'The syntax was fine, but the logic is impossible!',
    oneLiner: 'The server understands the content type and syntax, but was unable to process the contained semantic instructions.',
    scenario: 'You submitted a flight booking form with valid date formatting, but your departure date was set to yesterday, or return date before departure date.',
    realWorldExample: 'Semantic validation in Rails, Laravel, or FastAPI when business rules are violated despite valid JSON.',
    catUrl: 'https://http.cat/422',
    catAlt: 'Cat attempting to walk through a glass door',
    resolution: 'Fix the business logic errors highlighted in the response error breakdown.',
    simulatedRequest: {
      method: 'POST',
      url: 'https://api.airline.com/v1/flights/book',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        departureDate: '2026-10-15',
        returnDate: '2026-10-02'
      }, null, 2)
    },
    simulatedResponse: {
      statusText: 'Unprocessable Content',
      timeMs: 40,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        error: 'SemanticRuleViolation',
        errors: {
          returnDate: 'Return date cannot precede departure date.'
        }
      }
    }
  },
  {
    code: 429,
    title: 'Too Many Requests',
    family: '4xx',
    familyName: 'Client Error',
    tagline: 'Whoa! Slow down, you’re hitting the gas pedal too hard!',
    oneLiner: 'The user has sent too many requests in a given amount of time ("rate limiting").',
    scenario: 'A sneaker bot or automated scraper hammered the API with 1,000 requests in 3 seconds. The rate limiter fired and blocked the IP with a 429 response.',
    realWorldExample: 'Exceeding API quota (e.g. OpenAI / Twitter / GitHub limits: 60 requests per minute).',
    catUrl: 'https://http.cat/429',
    catAlt: 'Overwhelmed cat surrounded by dozens of bouncing ping pong balls',
    resolution: 'Wait for the duration specified in the `Retry-After` header and implement exponential backoff in your code.',
    simulatedRequest: {
      method: 'GET',
      url: 'https://api.fintech.com/v1/crypto/ticker',
      headers: {
        'X-Client-Id': 'bot_speedy_99'
      }
    },
    simulatedResponse: {
      statusText: 'Too Many Requests',
      timeMs: 8,
      headers: {
        'retry-after': '60',
        'x-ratelimit-limit': '100',
        'x-ratelimit-remaining': '0',
        'content-type': 'application/json'
      },
      body: {
        error: 'RateLimitExceeded',
        message: 'You have exceeded your tier limit of 100 req/min. Please chill for 60 seconds.',
        retryAfterSeconds: 60
      }
    }
  },

  // 5xx
  {
    code: 500,
    title: 'Internal Server Error',
    family: '5xx',
    familyName: 'Server Error',
    tagline: 'Kaboom! The server’s code crashed into a tree.',
    oneLiner: 'A generic error message, given when an unexpected condition was encountered on the server and no more specific message is suitable.',
    scenario: 'A backend developer wrote code that tried to access `user.profile.avatar.url`, but `user.profile` was `undefined`. The Node.js server crashed with an unhandled exception.',
    realWorldExample: 'Unhandled exceptions, database syntax errors, or null-pointer crashes inside the backend application.',
    catUrl: 'https://http.cat/500',
    catAlt: 'Cat in distress amidst a pile of knocked-over papers and cables',
    resolution: 'Backend engineers must check server error logs (Sentry / Datadog / CloudWatch) to patch the bug.',
    simulatedRequest: {
      method: 'POST',
      url: 'https://api.catclinic.com/v1/appointments',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ petName: 'Mittens', time: null })
    },
    simulatedResponse: {
      statusText: 'Internal Server Error',
      timeMs: 145,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        error: 'InternalServerError',
        message: 'An unexpected crash occurred on our servers. Incident tracked: #ERR-881920'
      }
    }
  },
  {
    code: 501,
    title: 'Not Implemented',
    family: '5xx',
    familyName: 'Server Error',
    tagline: 'We haven’t built that feature yet!',
    oneLiner: 'The server either does not recognize the request method, or lacks the ability to fulfill the request.',
    scenario: 'You send a `SEARCH` or `PATCH` HTTP request, but the server web framework only knows `GET` and `POST`.',
    realWorldExample: 'Placeholder endpoints stubbed out before the backend team finishes building the handler.',
    catUrl: 'https://http.cat/501',
    catAlt: 'Cat scratching head looking at an incomplete blueprint',
    resolution: 'Verify if the API actually supports this capability or wait for the release deployment.',
    simulatedRequest: {
      method: 'PATCH',
      url: 'https://api.vintageshop.com/v1/catalog',
      headers: {
        'Content-Type': 'application/json'
      }
    },
    simulatedResponse: {
      statusText: 'Not Implemented',
      timeMs: 19,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        error: 'NotImplemented',
        message: 'PATCH method is planned for v2 API release. Please use PUT.'
      }
    }
  },
  {
    code: 502,
    title: 'Bad Gateway',
    family: '5xx',
    familyName: 'Server Error',
    tagline: 'The bridge collapsed! The middleman received bad news.',
    oneLiner: 'The server, while acting as a gateway or proxy, received an invalid response from the inbound server it accessed.',
    scenario: 'Your request hit a reverse proxy or load balancer. The proxy forwarded the request to the application backend, but the backend died mid-flight and returned nothing.',
    realWorldExample: 'Reverse proxy (Nginx, Envoy, Traefik, HAProxy) failing to communicate with an upstream app container.',
    catUrl: 'https://http.cat/502',
    catAlt: 'Cat stranded on a broken suspension bridge',
    resolution: 'Check upstream application health, Docker container status, and internal port connectivity.',
    simulatedRequest: {
      method: 'GET',
      url: 'https://myapp.com/api/dashboard',
      headers: {
        'Host': 'myapp.com'
      }
    },
    simulatedResponse: {
      statusText: 'Bad Gateway',
      timeMs: 512,
      headers: {
        'server': 'nginx/1.24.0',
        'content-type': 'text/html'
      },
      body: {
        error: 'BadGateway',
        edgeProxy: 'Reverse Proxy Gateway',
        upstream: '10.0.4.12:8080 (ECONNRESET)'
      }
    }
  },
  {
    code: 503,
    title: 'Service Unavailable',
    family: '5xx',
    familyName: 'Server Error',
    tagline: 'Temporarily closed for a nap or massive stampede!',
    oneLiner: 'The server cannot handle the request because it is temporarily overloaded or down for planned maintenance.',
    scenario: 'During Black Friday, 250,000 shoppers refreshed the page at midnight. The servers ran out of CPU threads and shed excess traffic with a 503.',
    realWorldExample: 'Scheduled maintenance windows or autoscaling groups scaling up under heavy traffic spikes.',
    catUrl: 'https://http.cat/503',
    catAlt: 'Tired cat lying down next to a "CLOSED FOR MAINTENANCE" sign',
    resolution: 'Check server status page, wait for traffic to cool down, or retry in a few moments.',
    simulatedRequest: {
      method: 'GET',
      url: 'https://api.gamelaunch.com/v1/servers',
      headers: {
        'User-Agent': 'GameClient/4.0'
      }
    },
    simulatedResponse: {
      statusText: 'Service Unavailable',
      timeMs: 82,
      headers: {
        'retry-after': '120',
        'content-type': 'application/json'
      },
      body: {
        error: 'ServiceUnavailable',
        message: 'Servers undergoing routine database maintenance. Resuming in 2 minutes.',
        maintenanceWindow: '08:00 - 08:30 UTC'
      }
    }
  },
  {
    code: 504,
    title: 'Gateway Timeout',
    family: '5xx',
    familyName: 'Server Error',
    tagline: 'The proxy waited forever, but the backend never answered!',
    oneLiner: 'The server, while acting as a gateway or proxy, did not receive a timely response from an upstream server.',
    scenario: 'Your request reached the load balancer, which asked the database for a massive table query. The database query took 65 seconds, but the load balancer timeout was set to 30 seconds.',
    realWorldExample: 'Slow SQL queries, third-party payment gateway hangs, or serverless cold starts exceeding gateway timeout limits.',
    catUrl: 'https://http.cat/504',
    catAlt: 'Cat staring into an endless hourglass with paw resting on chin',
    resolution: 'Optimize database indexes, increase proxy timeout limits, or convert long operations into asynchronous background jobs.',
    simulatedRequest: {
      method: 'GET',
      url: 'https://api.bigdata.org/v1/aggregate-billion-rows',
      headers: {
        'Accept': 'application/json'
      }
    },
    simulatedResponse: {
      statusText: 'Gateway Timeout',
      timeMs: 30005,
      headers: {
        'server': 'nginx/1.24.0',
        'content-type': 'application/json'
      },
      body: {
        error: 'GatewayTimeout',
        message: 'Upstream server did not answer within 30000ms threshold.'
      }
    }
  }
];

export interface QuizQuestion {
  id: string;
  scenario: string;
  correctCode: number;
  options: number[];
  hint: string;
  explanation: string;
}

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    scenario: 'You try to visit a user profile on Instagram: `instagram.com/unknown_cat_profile_404981`, but no account has ever existed with that username.',
    correctCode: 404,
    options: [200, 404, 500, 403],
    hint: 'The server looked in the database, but the resource simply does not exist!',
    explanation: '404 Not Found is used when the server is functioning normally, but the requested endpoint or resource identifier cannot be found.'
  },
  {
    id: 'q2',
    scenario: 'You fill out a "Create New Account" form with your email and password. Your account is successfully created and saved in the database.',
    correctCode: 201,
    options: [200, 201, 204, 301],
    hint: 'A new resource was just born in the database!',
    explanation: '201 Created is the specific HTTP success status indicating that a new resource was successfully created as a result of the request (usually after a POST).'
  },
  {
    id: 'q3',
    scenario: 'You are logged into a company software as a junior intern. You try to click "Delete All Production Databases" in the admin settings.',
    correctCode: 403,
    options: [401, 403, 404, 405],
    hint: 'The server knows who you are, but you do NOT have permission!',
    explanation: '403 Forbidden means the server authenticated the user, but refuses to execute the command because of insufficient permissions or roles.'
  },
  {
    id: 'q4',
    scenario: 'A bot sends 2,000 requests in 3 seconds to check ticket availability for a rock concert.',
    correctCode: 429,
    options: [408, 429, 503, 400],
    hint: 'The client is hitting the gas pedal way too hard!',
    explanation: '429 Too Many Requests is returned by rate limiters when an IP or user exceeds the allowed number of requests in a given time window.'
  },
  {
    id: 'q5',
    scenario: 'A backend developer forgot to check for empty data, causing the Node.js application to crash with `TypeError: Cannot read properties of undefined`.',
    correctCode: 500,
    options: [400, 500, 502, 504],
    hint: 'The crash happened entirely inside the backend server code!',
    explanation: '500 Internal Server Error represents an unexpected backend crash or unhandled bug on the server side.'
  },
  {
    id: 'q6',
    scenario: 'You click "Delete Comment". The comment is successfully erased from the database, and the server returns an empty response body without any text.',
    correctCode: 204,
    options: [200, 204, 202, 304],
    hint: 'Success, but there are zero bytes to send back!',
    explanation: '204 No Content confirms that the action succeeded, but there is intentionally no content in the response body to send to the browser.'
  },
  {
    id: 'q7',
    scenario: 'Your mobile phone signal drops while sending a request. The server waits 15 seconds for you to finish sending the body, but gives up.',
    correctCode: 408,
    options: [408, 504, 502, 400],
    hint: 'The server got tired of waiting for the client!',
    explanation: '408 Request Timeout happens when the client starts a connection but does not finish transmitting the request within the server’s allowed wait time.'
  },
  {
    id: 'q8',
    scenario: 'The load balancer received your request, but the origin web server behind it took 45 seconds to answer, exceeding the 30s gateway limit.',
    correctCode: 504,
    options: [502, 503, 504, 408],
    hint: 'The middleman / gateway timed out waiting for the upstream server!',
    explanation: '504 Gateway Timeout occurs when a proxy or gateway (like Nginx or an API gateway) does not get a timely answer from the upstream server.'
  }
];

export function resolveHttpCode(code: number): HttpCode {
  const existing = HTTP_CODES.find((c) => c.code === code);
  if (existing) return existing;

  const firstDigit = Math.floor(code / 100);
  let family: '1xx' | '2xx' | '3xx' | '4xx' | '5xx' = '4xx';
  let familyName = 'Client Error';
  let defaultTitle = `Status ${code}`;
  let defaultOneLiner = `HTTP Status Code ${code} returned by the server.`;
  let defaultScenario = `The server responded with code ${code} to indicate a specific condition for this endpoint.`;

  if (firstDigit === 1) {
    family = '1xx';
    familyName = 'Informational';
    defaultOneLiner = 'The server received the preliminary request and expects you to continue.';
    defaultScenario = 'During initial handshake or streaming connection negotiations.';
  } else if (firstDigit === 2) {
    family = '2xx';
    familyName = 'Success';
    defaultOneLiner = 'The request succeeded and the server successfully handled your action.';
    defaultScenario = 'Your request was processed without any issues.';
  } else if (firstDigit === 3) {
    family = '3xx';
    familyName = 'Redirection';
    defaultOneLiner = 'The resource is located at another URL; further redirection is needed.';
    defaultScenario = 'When a page or asset has moved or needs a redirect hop.';
  } else if (firstDigit === 4) {
    family = '4xx';
    familyName = 'Client Error';
    defaultOneLiner = 'The request could not be processed due to a client-side problem or invalid parameters.';
    defaultScenario = 'When the client sent invalid parameters, expired headers, or an unfulfillable path.';
  } else if (firstDigit === 5) {
    family = '5xx';
    familyName = 'Server Error';
    defaultOneLiner = 'The server encountered an error and could not complete your request.';
    defaultScenario = 'When the upstream server, proxy, or database fails to respond.';
  }

  return {
    code,
    title: defaultTitle,
    family,
    familyName,
    tagline: `HTTP ${code} status cat`,
    oneLiner: defaultOneLiner,
    scenario: defaultScenario,
    realWorldExample: `Server returned HTTP ${code} in response to an API call.`,
    catUrl: `https://http.cat/${code}`,
    catAlt: `HTTP Cat ${code}`,
    resolution: 'Check API documentation and server response body for details.',
    simulatedRequest: {
      method: 'GET',
      url: `https://api.example.com/v1/resource/${code}`,
      headers: {
        'Accept': 'application/json'
      }
    },
    simulatedResponse: {
      statusText: defaultTitle,
      timeMs: 40,
      headers: {
        'content-type': 'application/json'
      },
      body: {
        status: code,
        message: defaultOneLiner
      }
    }
  };
}
