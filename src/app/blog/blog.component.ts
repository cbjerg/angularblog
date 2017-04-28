import { Component, OnInit } from '@angular/core';
import { BlogService } from '../shared/blog.service';
import { ActivatedRoute } from '@angular/router';
import { IBlog, IComment } from '../shared/blog.model';
import { ModalService } from '../shared/modal.service';
import { DeviceDiscoveryService } from '../shared/device-discovery.service';

@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss']
})
export class BlogComponent implements OnInit {
  blog: IBlog[];
  blogid: number;
  commenttext: string;
  commentauthor: string;
  charactersused: number = 0;
  overlimit = false;
  isedit = false;
  commenttoedit: IComment;
  istabletorphone = false;
  rightstyle ;


  constructor(
    private blogService: BlogService,
    private route: ActivatedRoute,
    private modalService: ModalService,
    private deviceDiscoveryService: DeviceDiscoveryService
  ) { }

  ngOnInit() {
    this.blog = this.route.snapshot.data['blog'];
    if (this.deviceDiscoveryService.deviceIsPhone() || this.deviceDiscoveryService.deviceIsTablet()){
      this.istabletorphone = true;
    }else{
            this.rightstyle = {
            'margin-left': '210px'
          };
    }
    console.log('rightstyle: ', this.rightstyle, this.istabletorphone);
  }

  voteup(id: number){
   var article = this.blogService.getBlogArticle(id);
    if(article.score < 10) {
      article.score++;
      this.blogService.updateBlog(article);
    }
  }

  votedown(id: number){
    var article = this.blogService.getBlogArticle(id);
    if(article.score > 0) {
      article.score--;
      this.blogService.updateBlog(article);
    }
    console.log('vote down', id);
  }

  edit(id: number, articleid: number) {
    this.blogid = articleid;
    this.isedit = true;
    let article = this.blogService.getBlogArticle(this.blogid);
    let comment = article.comments.find(article => article.id === id);
    this.commenttoedit = comment;
    this.commenttext = comment.text;
    this.commentauthor = comment.name;
    this.modalService.open('comment-modal');
  }

  delete(id: number, articleid: number){
    console.log('delete', id, articleid);
    const article = this.blogService.getBlogArticle(articleid);
    const index = article.comments.indexOf(article.comments.find(comment => comment.id === id));
    article.comments.splice(index, 1);
  }

  comment(id: number) {
    this.blogid = id;
    this.modalService.open('comment-modal');
    console.log('comment ', id);
  }

  saveComment() {
    if (this.overlimit){
      return;
    }
    let article = this.blogService.getBlogArticle(this.blogid);
    if (!this.isedit){
    var maxid = 0;
    article.comments.map(function(obj){
      if (obj.id > maxid) {
        maxid = obj.id;
      }
    });
    let comment: IComment = {
      id: maxid + 1,
      name: this.commentauthor,
      text: this.commenttext,
      created: new Date()
    };
    article.comments.unshift(comment);
    }else{
      const index = article.comments.indexOf(article.comments.find(comment => comment.id === this.commenttoedit.id));
      this.commenttoedit.name = this.commentauthor;
      this.commenttoedit.text = this.commenttext;
      article.comments[index] = this.commenttoedit;
    }
    this.commenttext = '';
    this.commentauthor = '';
    this.isedit = false;
    this.closeModal('comment-modal');
  }

  openModal(id: string){
     this.modalService.open(id);
   }

  closeModal(id: string){
     this.modalService.close(id);
  }

  changed() {
    if (this.commenttext){
      this.charactersused = this.commenttext.length;
   }
   if(this.charactersused >= 500){
     this.overlimit = true;
   }else{
     this.overlimit = false;
   }
  }

}
