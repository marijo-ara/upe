'use client'

import { useState } from 'react'
import { useLanguage } from '../contexts/LanguageContext'
import { Comment } from '../types';
import { Star, StarHalf } from 'lucide-react'
import { Button } from "../components/ui/button"
import { Textarea } from "../components/ui/textarea"

interface ProductReviewsProps {
  comments: Comment[];
  onAddComment: (content: string, rating: number) => void;
}

export function ProductReviews({ comments, onAddComment }: ProductReviewsProps) {
  const { t } = useLanguage();
  const [newComment, setNewComment] = useState('');
  const [newRating, setNewRating] = useState(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() && newRating > 0) {
      onAddComment(newComment.trim(), newRating);
      setNewComment('');
      setNewRating(0);
    }
  };

  const renderStars = (rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        stars.push(<Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else if (i - 0.5 <= rating) {
        stars.push(<StarHalf key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
      } else {
        stars.push(<Star key={i} className="w-4 h-4 text-gray-300" />);
      }
    }
    return stars;
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">{t('reviews')}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="rating" className="block text-sm font-medium text-gray-700">
            {t('rating')}
          </label>
          <div className="flex space-x-1 mt-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setNewRating(star)}
                className={`${
                  star <= newRating ? 'text-yellow-400' : 'text-gray-300'
                } hover:text-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500`}
              >
                <Star className="w-6 h-6" />
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
            {t('comment')}
          </label>
          <Textarea
            id="comment"
            rows={3}
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            className="mt-1"
            placeholder={t('writeYourComment')}
          />
        </div>
        <Button type="submit">{t('submitReview')}</Button>
      </form>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="border-b pb-4">
            <div className="flex items-center justify-between">
              <span className="font-semibold">{comment.username}</span>
              <span className="text-sm text-gray-500">
                {new Date(comment.createdAt).toLocaleDateString()}
              </span>
            </div>
            <div className="flex items-center mt-1">
              {renderStars(comment.rating)}
            </div>
            <p className="mt-2">{comment.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

