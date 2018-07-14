/**
 * Class representing blog news entry.
 */
export class NewsEntry {
  update: boolean;
  badge: string;
  badgeColor: string;
  entryDate: Date;
  title: string;
  link: URL;
  detail: string;

  constructor(blogResult: any) {
    if (blogResult.hasOwnProperty('published')) {
      this.update = false;
      this.badge = 'Created: ';
      this.badgeColor = 'primary';
      this.entryDate = new Date(blogResult.published);
    }
    if (blogResult.hasOwnProperty('updated')) {
      this.update = true;
      this.badge = 'Updated: ';
      this.badgeColor = 'accent';
      this.entryDate = new Date(blogResult.updated);
    }
    this.title = blogResult.title || '';
    this.link = new URL(blogResult.url) || null;
    this.detail = blogResult.content;
    if (this.detail.length > 200) {
      this.detail = this.detail.substr(0, 200) + '...';
    }
  }

}
