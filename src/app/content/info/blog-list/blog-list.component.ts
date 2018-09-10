import {Component, OnDestroy, OnInit} from '@angular/core';
import {NewsEntry} from './news-entry';
import {HttpClient, HttpParams} from '@angular/common/http';
import {DomSanitizer, SafeHtml} from '@angular/platform-browser';

const bloggerAPIKey = 'AIzaSyCoQFXxawtc-x-1aF7DVbvilnnCONqXPPw';
const bloggerURL = 'https://www.googleapis.com/blogger/v3/blogs/1703723675504697677/posts';

@Component({
  selector: 'app-blog-list',
  templateUrl: './blog-list.component.html',
  styleUrls: ['./blog-list.component.css']
})
export class BlogListComponent implements OnInit, OnDestroy {
  blogEntries: Array<NewsEntry> = [];
  newsTimer = 0;

  constructor(private httpClient: HttpClient, private sanitizer: DomSanitizer) {
  }

  sanitize(detail: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(detail);
  }

  loadNews(): void {
    const params = new HttpParams()
      .set('fetchBodies', 'true')
      .set('fetchImages', 'false')
      .set('labels', 'evekit')
      .set('maxResults', '10')
      .set('orderBy', 'updated')
      .set('status', 'live')
      .set('view', 'READER')
      .set('key', bloggerAPIKey);

    this.httpClient.jsonp(`${bloggerURL}?${params.toString()}`, 'callback')
      .subscribe(
        data => {
          this.blogEntries = [];
          for (const item of data['items']) {
            this.blogEntries.push(new NewsEntry(item));
          }
        },
        err => console.log('news request failed: %s', err.status)
      );
  }

  ngOnInit(): void {
    this.loadNews();
    this.newsTimer = setInterval(() => {
      this.loadNews();
    }, 300 * 1000);
  }

  ngOnDestroy(): void {
    if (this.newsTimer > 0) {
      clearInterval(this.newsTimer);
    }
  }

}
