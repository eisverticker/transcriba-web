import { Component, OnChanges, Input} from '@angular/core';

import { Comment } from './comment';

@Component({
  moduleId:     module.id,
  selector:    'simple-comment',
  templateUrl: 'comment.component.html',
  styleUrls: []
})
export class CommentComponent implements OnChanges{
  @Input() comment: Comment;

  constructor(){}

  ngOnChanges(){

  }

}
