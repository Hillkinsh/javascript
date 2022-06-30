function route(handle, pathname, res)  {
  if (pathname.indexOf('/') !== -1) {
    pathname = pathname.slice(1)
  }
  console.log("About to route a request for "  + pathname);  
    if  (typeof handle[pathname]  ===  'function')  {    
        return handle[pathname](res);  }  
    else  {
        console.log("No request handler found for "  + pathname);    
        return  "404 Not found";  
    }
}

exports.route = route;